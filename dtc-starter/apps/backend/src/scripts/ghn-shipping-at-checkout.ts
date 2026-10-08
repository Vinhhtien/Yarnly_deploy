/**
 * Switches the GHN shipping option to a price GHN calculates at checkout
 * (one parcel per sub-order), instead of a flat 0₫ paid to the shipper on
 * delivery. Safe to run again.
 *
 *   pnpm medusa exec ./src/scripts/ghn-shipping-at-checkout.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  MedusaError,
  ShippingOptionPriceType,
} from "@medusajs/framework/utils"
import { updateShippingOptionsWorkflow } from "@medusajs/medusa/core-flows"

export const GHN_OPTION_NAME = "Giao Hàng Nhanh (GHN)"

export default async function ghnShippingAtCheckout({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: options } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name", "provider_id", "price_type"],
  })
  const ghn = (options as any[]).filter((option) => option.provider_id?.includes("ghn"))

  if (!ghn.length) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "No GHN shipping option: create one with the ghn-fulfillment provider first"
    )
  }

  await updateShippingOptionsWorkflow(container).run({
    input: ghn.map((option) => ({
      id: option.id,
      name: GHN_OPTION_NAME,
      price_type: ShippingOptionPriceType.CALCULATED,
    })),
  })

  logger.info(`GHN shipping is now calculated at checkout: ${ghn.map((o) => o.id).join(", ")}`)
}
