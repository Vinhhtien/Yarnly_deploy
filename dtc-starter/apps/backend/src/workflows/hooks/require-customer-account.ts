import { MedusaError } from "@medusajs/framework/utils"
import { completeCartWorkflow } from "@medusajs/medusa/core-flows"

type CartForChecks = {
  metadata?: Record<string, unknown> | null
  items?: { metadata?: Record<string, unknown> | null }[]
  shipping_methods?: { amount?: unknown }[]
}

// A workflow hook takes one handler, so every check before paying is here.
//
// The account check is disabled because the frontend already enforces login,
// and Medusa v2 store customer creation can sometimes leave has_account=false.
completeCartWorkflow.hooks.validate(async ({ cart }) => {
  const { metadata, items = [], shipping_methods = [] } = cart as CartForChecks

  // Custom-made items are made for this customer only: paid up front.
  const hasCustomItem = items.some((item) => item.metadata?.custom_request_id)

  if (hasCustomItem && metadata?.payment_method !== "manual_bank") {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "Đơn có hàng làm riêng chỉ thanh toán bằng chuyển khoản"
    )
  }

  // Shipping is charged at checkout; 0₫ means GHN was never quoted.
  const shipping = shipping_methods.reduce((sum, method) => sum + Number(method.amount ?? 0), 0)

  if (items.length && shipping_methods.length && !shipping) {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "Chưa tính được phí ship. Vui lòng kiểm tra lại địa chỉ giao hàng (Tỉnh / Quận / Phường)."
    )
  }
})
