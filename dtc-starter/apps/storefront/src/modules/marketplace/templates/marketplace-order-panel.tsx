import { getMarketplaceOrder } from "@lib/data/marketplace"
import { Heading } from "@modules/common/components/ui"
import BankTransferBox from "../components/bank-transfer-box"
import SubOrderList from "../components/sub-order-list"

/** Payment box and per-artisan sub-orders of one order. */
export default async function MarketplaceOrderPanel({ orderId }: { orderId: string }) {
  const order = await getMarketplaceOrder(orderId)

  if (!order) {
    return (
      <p className="txt-medium text-ui-fg-subtle">
        Đơn hàng đang được chia cho các nghệ nhân, vui lòng tải lại trang sau giây lát.
      </p>
    )
  }

  const shops = Array.from(
    new Set(order.sub_orders.map((sub) => sub.artisan?.shop_name).filter(Boolean))
  ).join(", ")

  return (
    <div className="flex flex-col gap-4" data-testid="marketplace-order">
      <BankTransferBox order={order} />
      <Heading level="h2" className="text-2xl-regular">
        {order.sub_orders.length > 1
          ? `Đơn gồm ${order.sub_orders.length} gói từ ${shops}, giao riêng từng gói`
          : "Tình trạng đơn hàng"}
      </Heading>
      <SubOrderList subOrders={order.sub_orders} />
    </div>
  )
}
