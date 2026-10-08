import type { MedusaContainer } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils"
import { MARKETPLACE_MODULE } from "../../modules/marketplace"
import type MarketplaceModuleService from "../../modules/marketplace/service"
import {
  ACCEPT_WINDOW_HOURS,
  DAY,
  HOUR,
  MINUTE,
  PAYMENT_WINDOW_MINUTES,
} from "./constants"
import { addMs } from "./format"
import { toNumber } from "./numbers"
import {
  type Parcel,
  ghnDestination,
  groupIntoParcels,
  itemTotal,
  quoteParcels,
  splitCharged,
} from "./parcels"

type OrderItem = {
  id: string
  title: string
  variant_title?: string | null
  thumbnail?: string | null
  quantity: number
  unit_price: unknown
  total?: unknown
  product_id?: string | null
  variant_id?: string | null
  metadata?: Record<string, unknown> | null
}

/**
 * State a sub-order enters once it may start: a custom order was already
 * agreed on, so it goes straight to work; anything else waits 12 hours for
 * the artisan to accept.
 */
export const startState = (
  subOrder: { is_custom: boolean; lead_days?: number | null },
  now: Date
) =>
  subOrder.is_custom
    ? {
        status: "processing" as const,
        accepted_at: now,
        due_date: addMs(now, (subOrder.lead_days ?? 0) * DAY),
      }
    : {
        status: "pending_acceptance" as const,
        accept_deadline: addMs(now, ACCEPT_WINDOW_HOURS * HOUR),
      }

/**
 * What each parcel's customer paid for shipping. Checkout charged one total
 * for all parcels; it is shared out by a fresh GHN quote (cached, so normally
 * the very same fees), always adding up to exactly the amount charged.
 */
async function shareShipping(
  container: MedusaContainer,
  order: any,
  items: OrderItem[],
  parcels: Parcel<OrderItem>[]
) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const charged = ((order.shipping_methods ?? []) as { amount: unknown }[]).reduce(
    (sum, method) => sum + toNumber(method.amount),
    0
  )

  if (!charged) {
    return parcels.map(() => 0)
  }

  const to = ghnDestination(order.metadata)
  let quotes = parcels.map(() => 0)

  if (to) {
    try {
      const { parcels: quoted } = await quoteParcels(container, items, to)
      quotes = parcels.map((parcel) => quoted.find((q) => q.key === parcel.key)?.fee ?? 0)
    } catch (error) {
      logger.warn(
        `Order ${order.id}: GHN quote failed, shipping shared evenly: ${(error as Error).message}`
      )
    }
  }

  return splitCharged(charged, quotes)
}

/**
 * Creates the marketplace order and one sub-order per artisan for a placed
 * Medusa order. Custom-request items get a sub-order of their own. Safe to
 * call more than once: an existing marketplace order is returned as is.
 */
export async function ensureMarketplaceOrder(
  container: MedusaContainer,
  orderId: string
) {
  const marketplace: MarketplaceModuleService =
    container.resolve(MARKETPLACE_MODULE)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const [existing] = await marketplace.listMarketplaceOrders({
    order_id: orderId,
  })

  if (existing) {
    return { marketplaceOrder: existing, created: false }
  }

  const {
    data: [order],
  } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "email",
      "customer_id",
      "currency_code",
      "metadata",
      "created_at",
      "items.*",
      "items.total",
      "shipping_address.*",
      "shipping_methods.amount",
    ],
    filters: { id: orderId },
  })

  if (!order) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Không tìm thấy đơn hàng")
  }

  const items = (order.items ?? []) as unknown as OrderItem[]
  const { parcels: groups, productById } = await groupIntoParcels(container, items)
  const shippingCharged = await shareShipping(container, order, items, groups)

  const customRequestIds = groups
    .map((group) => group.custom_request_id)
    .filter(Boolean) as string[]
  const customRequests = customRequestIds.length
    ? await marketplace.listCustomRequests({ id: customRequestIds })
    : []

  const isBankTransfer = order.metadata?.payment_method === "manual_bank"
  const now = new Date()
  const address = order.shipping_address

  const subOrders = groups.map((group, index) => {
    const custom = customRequests.find(
      (request) => request.id === group.custom_request_id
    )
    const madeToOrderDays = group.items.map((item) => {
      const metadata = productById.get(item.product_id ?? "")?.metadata ?? {}
      return metadata.fulfillment_type === "made_to_order"
        ? Number(metadata.lead_days) || 0
        : null
    })
    const madeToOrder = !!custom || madeToOrderDays.some((days) => days !== null)
    const leadDays = custom
      ? custom.quoted_lead_days ?? 0
      : madeToOrder
        ? Math.max(...madeToOrderDays.map((days) => days ?? 0))
        : null

    const subOrder = {
      code: `#${order.display_id}-${index + 1}`,
      artisan_id: group.artisan_id,
      is_custom: !!custom,
      custom_request_id: custom?.id ?? null,
      made_to_order: madeToOrder,
      lead_days: leadDays,
      subtotal: group.items.reduce((sum, item) => sum + itemTotal(item), 0),
      shipping_charged: shippingCharged[index],
      shipping_name: address
        ? [address.last_name, address.first_name].filter(Boolean).join(" ")
        : null,
      shipping_phone: address?.phone ?? null,
      shipping_address: address
        ? [address.address_1, address.city, address.province]
            .filter(Boolean)
            .join(", ")
        : null,
      items: group.items.map((item) => ({
        line_item_id: item.id,
        made_to_order:
          !!custom ||
          productById.get(item.product_id ?? "")?.metadata?.fulfillment_type ===
            "made_to_order",
        product_id: item.product_id ?? null,
        variant_id: item.variant_id ?? null,
        title: item.title,
        variant_title: item.variant_title ?? null,
        thumbnail: item.thumbnail ?? null,
        quantity: item.quantity,
        unit_price: toNumber(item.unit_price),
        total: itemTotal(item),
      })),
    }

    return {
      ...subOrder,
      ...(isBankTransfer
        ? { status: "pending_payment" as const }
        : startState(subOrder, now)),
    }
  })

  try {
    const marketplaceOrder = await marketplace.createOrderWithSubOrders({
      order: {
        order_id: order.id,
        display_id: order.display_id,
        customer_id: order.customer_id ?? null,
        email: order.email,
        currency_code: order.currency_code,
        items_total: subOrders.reduce((sum, sub) => sum + sub.subtotal, 0),
        payment_method: isBankTransfer ? "bank_transfer" : "cod",
        payment_status: isBankTransfer ? "awaiting_transfer" : "cod",
        payment_deadline: isBankTransfer
          ? addMs(new Date(order.created_at as string), PAYMENT_WINDOW_MINUTES * MINUTE)
          : null,
      },
      sub_orders: subOrders,
    })

    if (customRequests.length) {
      await marketplace.updateCustomRequests(
        customRequests.map((request) => ({
          id: request.id,
          status: "ordered" as const,
          order_id: order.id,
        }))
      )
    }

    return { marketplaceOrder, created: true }
  } catch (error) {
    // Another caller created it in the meantime (unique order_id).
    const [raced] = await marketplace.listMarketplaceOrders({ order_id: orderId })

    if (raced) {
      return { marketplaceOrder: raced, created: false }
    }

    throw error
  }
}
