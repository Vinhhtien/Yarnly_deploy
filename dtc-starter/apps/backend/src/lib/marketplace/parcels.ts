import type { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { MARKETPLACE_MODULE } from "../../modules/marketplace"
import type MarketplaceModuleService from "../../modules/marketplace/service"
import { HOUSE_ARTISAN_HANDLE } from "./constants"
import { quoteGhnFee } from "./ghn"
import { toNumber } from "./numbers"

/** A cart or order line, as far as splitting into parcels is concerned. */
export type ParcelItem = {
  id: string
  product_id?: string | null
  quantity: number
  unit_price: unknown
  total?: unknown
  metadata?: Record<string, unknown> | null
}

export type Parcel<T extends ParcelItem> = {
  key: string
  artisan_id: string
  custom_request_id: string | null
  items: T[]
}

/** Grams, when a product has no weight set. */
const DEFAULT_WEIGHT = 200

export const itemTotal = (item: ParcelItem) =>
  item.total !== undefined && item.total !== null
    ? toNumber(item.total)
    : toNumber(item.unit_price) * item.quantity

/**
 * Splits items the way an order is split into sub-orders: one parcel per
 * artisan, and one of its own for every custom-made item. Each parcel is
 * picked up at its artisan and shipped (and charged) separately.
 */
export async function groupIntoParcels<T extends ParcelItem>(
  container: MedusaContainer,
  items: T[]
) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const marketplace: MarketplaceModuleService = container.resolve(MARKETPLACE_MODULE)

  const productIds = [
    ...new Set(items.map((item) => item.product_id).filter(Boolean)),
  ] as string[]

  const [products, [houseArtisan]] = await Promise.all([
    productIds.length
      ? query
          .graph({
            entity: "product",
            fields: ["id", "metadata", "weight", "artisan.id"],
            filters: { id: productIds },
            withDeleted: true,
          })
          .then(({ data }) => data as any[])
      : Promise.resolve([] as any[]),
    marketplace.listArtisans({ handle: HOUSE_ARTISAN_HANDLE }),
  ])

  const productById = new Map<string, any>(
    products.map((product) => [product.id, product])
  )
  const parcels = new Map<string, Parcel<T>>()

  for (const item of items) {
    const artisanId =
      productById.get(item.product_id ?? "")?.artisan?.id ?? houseArtisan?.id

    if (!artisanId) {
      logger.error(`Item ${item.id} has no artisan and there is no house artisan`)
      continue
    }

    const customRequestId =
      (item.metadata?.custom_request_id as string | undefined) ?? null
    const key = customRequestId ? `custom:${customRequestId}` : artisanId
    const parcel: Parcel<T> = parcels.get(key) ?? {
      key,
      artisan_id: artisanId,
      custom_request_id: customRequestId,
      items: [],
    }

    parcel.items.push(item)
    parcels.set(key, parcel)
  }

  return { parcels: [...parcels.values()], productById }
}

/**
 * GHN's fee for every parcel, from its artisan's pickup ward to the
 * customer's ward. An artisan without a pickup ward is quoted from Yarnly's
 * GHN shop address.
 */
export async function quoteParcels<T extends ParcelItem>(
  container: MedusaContainer,
  items: T[],
  to: { district_id: number; ward_code: string }
) {
  const marketplace: MarketplaceModuleService = container.resolve(MARKETPLACE_MODULE)
  const { parcels, productById } = await groupIntoParcels(container, items)
  const artisans = parcels.length
    ? await marketplace.listArtisans({ id: [...new Set(parcels.map((p) => p.artisan_id))] })
    : []

  const quoted = await Promise.all(
    parcels.map(async (parcel) => {
      const artisan: any = artisans.find((a) => a.id === parcel.artisan_id)
      const fee = await quoteGhnFee({
        from_district_id: artisan?.pickup_district_id ?? null,
        from_ward_code: artisan?.pickup_ward_code ?? null,
        to_district_id: to.district_id,
        to_ward_code: to.ward_code,
        weight: parcel.items.reduce(
          (sum, item) =>
            sum +
            (Number(productById.get(item.product_id ?? "")?.weight) || DEFAULT_WEIGHT) *
              item.quantity,
          0
        ),
        insurance_value: parcel.items.reduce((sum, item) => sum + itemTotal(item), 0),
      })

      return { ...parcel, fee }
    })
  )

  return {
    parcels: quoted,
    productById,
    total: quoted.reduce((sum, parcel) => sum + parcel.fee, 0),
  }
}

/**
 * Shares the shipping the customer was charged across the parcels, in
 * proportion to their quotes (or evenly when there are none), so the
 * sub-orders add up to exactly what was paid.
 */
export function splitCharged(charged: number, quotes: number[]) {
  if (!quotes.length) {
    return []
  }

  const quoted = quotes.reduce((sum, fee) => sum + fee, 0)
  const shares = quotes.map((fee) =>
    Math.floor(quoted > 0 ? (charged * fee) / quoted : charged / quotes.length)
  )
  // Rounding leftovers go to the first parcel.
  shares[0] += charged - shares.reduce((sum, share) => sum + share, 0)

  return shares
}

/** The customer's GHN district and ward, saved on the cart/order at checkout. */
export const ghnDestination = (metadata?: Record<string, unknown> | null) => {
  const district_id = Number(metadata?.district_id)
  const ward_code = metadata?.ward_code ? String(metadata.ward_code) : ""

  return district_id && ward_code ? { district_id, ward_code } : null
}
