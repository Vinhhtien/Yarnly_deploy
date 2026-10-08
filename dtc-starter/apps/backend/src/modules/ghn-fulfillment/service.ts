import {
  AbstractFulfillmentProviderService,
  MedusaError,
} from "@medusajs/framework/utils"
import type {
  CalculatedShippingOptionPrice,
  CreateFulfillmentResult,
  FulfillmentOption,
} from "@medusajs/framework/types"

type YarnlyShipping = { total: number | null; reason?: string }

/**
 * The "Giao Hàng Nhanh (GHN)" shipping option customers pick at checkout.
 *
 * Its price is GHN's fee for every parcel of the cart (one per artisan, and
 * one per custom-made item), quoted by src/workflows/hooks/ghn-shipping-price.ts
 * and handed over in the pricing context. The customer pays it at checkout;
 * Yarnly pays GHN. The real GHN orders are booked per sub-order from
 * Admin → Đơn sàn (src/lib/marketplace/ghn-shipping.ts), because each
 * artisan's parcel is picked up at a different address. Medusa's own
 * "Create Fulfillment" is blocked for marketplace orders.
 */
class GHNFulfillmentService extends AbstractFulfillmentProviderService {
  static identifier = "ghn-fulfillment"

  async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
    return [{ id: "ghn-standard", name: "GHN Tiêu chuẩn" }]
  }

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return { ...optionData, ...data }
  }

  async validateOption(): Promise<boolean> {
    return true
  }

  async canCalculate(): Promise<boolean> {
    return true
  }

  async calculatePrice(
    _optionData: Record<string, unknown>,
    _data: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<CalculatedShippingOptionPrice> {
    const shipping = context?.yarnly_shipping as YarnlyShipping | undefined

    if (shipping?.reason === "no_ward") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Vui lòng chọn Tỉnh / Quận / Phường giao hàng để tính phí ship"
      )
    }

    // No address yet: nothing to quote. The price is set again (the cart's
    // shipping method refreshed) as soon as the address is saved.
    return {
      calculated_amount: shipping?.total ?? 0,
      is_calculated_price_tax_inclusive: true,
    }
  }

  // Only reached for orders placed before the marketplace existed.
  async createFulfillment(): Promise<CreateFulfillmentResult> {
    return { data: {}, labels: [] }
  }

  async cancelFulfillment(): Promise<Record<string, unknown>> {
    return {}
  }

  async createReturnFulfillment(): Promise<CreateFulfillmentResult> {
    return { data: {}, labels: [] }
  }
}

export default GHNFulfillmentService
