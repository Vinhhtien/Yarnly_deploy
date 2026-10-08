import type { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { StepResponse } from "@medusajs/framework/workflows-sdk"
import {
  calculateShippingOptionsPricesWorkflow,
  listShippingOptionsForCartWithPricingWorkflow,
} from "@medusajs/medusa/core-flows"
import { ghnDestination, quoteParcels } from "../../lib/marketplace/parcels"

/**
 * Shipping is charged at checkout: one GHN parcel per sub-order (each
 * artisan, and each custom-made item), from the artisan to the customer.
 * The GHN provider only sees cart fields Medusa picks, so the quote is made
 * here, with the whole app at hand, and passed in the pricing context.
 *
 * `yarnly_shipping.total` is null until the customer entered an address.
 */
async function quoteCart(container: MedusaContainer, cartId?: string) {
  if (!cartId) {
    return { yarnly_shipping: { total: null, reason: "no_cart" } }
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const {
    data: [cart],
  } = await query.graph({
    entity: "cart",
    fields: [
      "id",
      "metadata",
      "shipping_address.id",
      "items.id",
      "items.product_id",
      "items.quantity",
      "items.unit_price",
      "items.metadata",
    ],
    filters: { id: cartId },
  })

  if (!cart?.shipping_address) {
    return { yarnly_shipping: { total: null, reason: "no_address" } }
  }

  const to = ghnDestination(cart.metadata as Record<string, unknown> | null)

  if (!to) {
    return { yarnly_shipping: { total: null, reason: "no_ward" } }
  }

  const { total } = await quoteParcels(container, (cart.items ?? []) as any[], to)

  return { yarnly_shipping: { total } }
}

// Picking or refreshing the cart's shipping method.
listShippingOptionsForCartWithPricingWorkflow.hooks.setCalculatedShippingPricingContext(
  async ({ input }, { container }) =>
    new StepResponse(await quoteCart(container, (input as { cart_id?: string }).cart_id))
)

// Showing the price of the option at checkout.
calculateShippingOptionsPricesWorkflow.hooks.setCalculatedShippingPricingContext(
  async ({ input }, { container }) =>
    new StepResponse(await quoteCart(container, (input as { cart_id?: string }).cart_id))
)
