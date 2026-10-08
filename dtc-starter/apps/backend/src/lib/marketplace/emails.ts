import type { MedusaContainer } from "@medusajs/framework/types"
import { MARKETPLACE_MODULE } from "../../modules/marketplace"
import type MarketplaceModuleService from "../../modules/marketplace/service"
import { STOREFRONT_URL } from "./constants"
import {
  escapeHtml,
  formatDate,
  formatDateTime,
  formatVnd,
} from "./format"
import { link, notifyAdmin, paragraph, sendEmail } from "./notify"
import { subOrderAmount } from "./serialize"

const ARTISAN_PORTAL_URL = `${STOREFRONT_URL}/kenh-nghe-nhan`

type Item = {
  title: string
  variant_title?: string | null
  quantity: number
  total: unknown
}

type Artisan = {
  id: string
  shop_name: string
  email: string
  phone?: string
  pickup_address?: string
}

export type FullSubOrder = {
  id: string
  code: string
  status: string
  lead_days?: number | null
  subtotal: unknown
  shipping_charged?: unknown
  due_date?: Date | string | null
  accept_deadline?: Date | string | null
  carrier?: string | null
  tracking_number?: string | null
  shipping_fee?: unknown
  cancel_reason?: string | null
  refund_status?: string
  shipping_name?: string | null
  shipping_phone?: string | null
  shipping_address?: string | null
  items: Item[]
  artisan: Artisan
  marketplace_order: {
    id: string
    order_id: string
    display_id: number
    email: string
    payment_method: string
    payment_status: string
  }
}

const itemsTable = (items: Item[]) => `
<table style="width:100%;border-collapse:collapse;font-size:14px">
  ${items
    .map(
      (item) => `<tr>
    <td style="padding:6px 0;border-bottom:1px solid #eee">${item.quantity} × ${escapeHtml(item.title)}${
        item.variant_title ? ` <span style="color:#6b7280">(${escapeHtml(item.variant_title)})</span>` : ""
      }</td>
    <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right">${formatVnd(item.total)}</td>
  </tr>`
    )
    .join("")}
</table>`

const orderLink = (sub: FullSubOrder) =>
  link(`${STOREFRONT_URL}/account/orders/details/${sub.marketplace_order.order_id}`, "Xem đơn hàng")

export async function emailOrderPlaced(
  container: MedusaContainer,
  marketplaceOrderId: string
) {
  const marketplace: MarketplaceModuleService =
    container.resolve(MARKETPLACE_MODULE)
  const order = await marketplace.retrieveMarketplaceOrder(marketplaceOrderId, {
    relations: ["sub_orders", "sub_orders.items", "sub_orders.artisan"],
  })

  const subOrders = order.sub_orders
    .map(
      (sub) =>
        `<h4 style="margin-bottom:4px">Đơn ${escapeHtml(sub.code)} – ${escapeHtml(sub.artisan.shop_name)}</h4>${itemsTable(sub.items as Item[])}${paragraph(`Phí ship: ${formatVnd(sub.shipping_charged ?? 0)}`)}`
    )
    .join("")

  const total = order.sub_orders.reduce((sum, sub) => sum + subOrderAmount(sub), 0)
  const shops = [...new Set(order.sub_orders.map((sub) => sub.artisan.shop_name))]

  const payment =
    order.payment_method === "bank_transfer"
      ? paragraph(
          `Bạn đã chọn <b>chuyển khoản</b>. Vui lòng chuyển <b>${formatVnd(total)}</b> (tiền hàng + phí ship) trong vòng <b>10 phút</b> (trước ${formatDateTime(order.payment_deadline)}) và bấm "Tôi đã chuyển khoản" trên trang đơn hàng, nếu không đơn sẽ tự huỷ.`
        )
      : paragraph(
          `Bạn đã chọn <b>thanh toán khi nhận hàng (COD)</b>: shipper thu <b>${formatVnd(total)}</b> (tiền hàng + phí ship), chia theo từng gói.`
        )

  await sendEmail(
    container,
    order.email,
    `Đặt hàng thành công – đơn #${order.display_id}`,
    paragraph(
      `Cảm ơn bạn đã đặt hàng tại Yarnly. Đơn của bạn gồm ${order.sub_orders.length} gói từ ${shops.map(escapeHtml).join(", ")}, mỗi gói giao riêng.`
    ) +
      payment +
      subOrders +
      link(`${STOREFRONT_URL}/account/orders/details/${order.order_id}`, "Xem đơn hàng")
  )
}

export async function emailArtisanNewSubOrder(
  container: MedusaContainer,
  sub: FullSubOrder
) {
  const action =
    sub.status === "processing"
      ? paragraph(
          `Đây là đơn <b>làm theo yêu cầu riêng</b> mà bạn đã đồng ý. Hạn hoàn thành: <b>${formatDate(sub.due_date)}</b>.`
        )
      : paragraph(
          `Vui lòng xác nhận nhận đơn trước <b>${formatDateTime(sub.accept_deadline)}</b> (12 tiếng). Quá hạn đơn sẽ tự huỷ.`
        )

  await sendEmail(
    container,
    sub.artisan.email,
    `Bạn có đơn hàng mới ${sub.code}`,
    action +
      itemsTable(sub.items) +
      paragraph(`Tổng tiền hàng: <b>${formatVnd(sub.subtotal)}</b>`) +
      link(`${ARTISAN_PORTAL_URL}/don-hang/${sub.id}`, "Mở đơn hàng")
  )
}

export async function emailPaymentConfirmed(
  container: MedusaContainer,
  order: { id: string; email: string; display_id: number; order_id: string }
) {
  const marketplace: MarketplaceModuleService = container.resolve(MARKETPLACE_MODULE)
  const subOrders = await marketplace.listSubOrders(
    { marketplace_order_id: order.id },
    { relations: ["artisan"] }
  )
  const shops = [...new Set(subOrders.map((sub) => sub.artisan.shop_name))]

  await sendEmail(
    container,
    order.email,
    `Đã nhận tiền chuyển khoản – đơn #${order.display_id}`,
    paragraph(
      `Yarnly đã nhận được tiền chuyển khoản của bạn. Đơn hàng đã được gửi tới ${shops.map(escapeHtml).join(", ")}.`
    ) + link(`${STOREFRONT_URL}/account/orders/details/${order.order_id}`, "Xem đơn hàng")
  )
}

export async function emailTransferSubmitted(
  container: MedusaContainer,
  order: { id: string; display_id: number; email: string }
) {
  const marketplace: MarketplaceModuleService = container.resolve(MARKETPLACE_MODULE)
  // Sub-orders the customer canceled meanwhile are not owed.
  const owed = (await marketplace.listSubOrders({ marketplace_order_id: order.id }))
    .filter((sub) => sub.status !== "canceled")
    .reduce((sum, sub) => sum + subOrderAmount(sub), 0)

  await notifyAdmin(
    container,
    `Khách báo đã chuyển khoản – đơn #${order.display_id}`,
    paragraph(
      `Khách ${escapeHtml(order.email)} báo đã chuyển <b>${formatVnd(owed)}</b> (tiền hàng + phí ship) cho đơn #${order.display_id} (nội dung "YARNLY ${order.display_id}"). Vui lòng kiểm tra sao kê và xác nhận trong trang Admin → Đơn sàn.`
    )
  )
}

export async function emailSubOrderAccepted(
  container: MedusaContainer,
  sub: FullSubOrder
) {
  const due = sub.due_date
    ? `${escapeHtml(sub.artisan.shop_name)} sẽ làm xong trước <b>${formatDate(sub.due_date)}</b>.`
    : `${escapeHtml(sub.artisan.shop_name)} đang chuẩn bị hàng để giao.`

  await sendEmail(
    container,
    sub.marketplace_order.email,
    `${sub.artisan.shop_name} đã nhận đơn ${sub.code}`,
    paragraph(`${escapeHtml(sub.artisan.shop_name)} đã nhận đơn ${sub.code}. ${due}`) +
      orderLink(sub)
  )
}

export async function emailSubOrderCanceled(
  container: MedusaContainer,
  sub: FullSubOrder,
  notifyArtisan: boolean
) {
  const refund =
    sub.refund_status === "pending"
      ? paragraph(
          `Số tiền <b>${formatVnd(subOrderAmount(sub))}</b> (tiền hàng + phí ship) bạn đã chuyển khoản sẽ được Yarnly hoàn lại vào tài khoản đã chuyển.`
        )
      : ""

  await sendEmail(
    container,
    sub.marketplace_order.email,
    `Đơn ${sub.code} đã bị huỷ`,
    paragraph(`Lý do: ${escapeHtml(sub.cancel_reason)}`) +
      itemsTable(sub.items) +
      refund +
      orderLink(sub)
  )

  if (notifyArtisan) {
    await sendEmail(
      container,
      sub.artisan.email,
      `Đơn ${sub.code} đã bị huỷ`,
      paragraph(`Lý do: ${escapeHtml(sub.cancel_reason)}`) + itemsTable(sub.items)
    )
  }

  if (sub.refund_status === "pending") {
    await notifyAdmin(
      container,
      `Cần hoàn tiền đơn ${sub.code}`,
      paragraph(
        `Đơn ${sub.code} (khách ${escapeHtml(sub.marketplace_order.email)}) đã huỷ sau khi khách chuyển khoản. Cần hoàn <b>${formatVnd(subOrderAmount(sub))}</b> (tiền hàng + phí ship), sau đó bấm "Đã hoàn tiền" trong Admin → Đơn sàn.`
      )
    )
  }
}

export async function emailReadyToShip(
  container: MedusaContainer,
  sub: FullSubOrder
) {
  await notifyAdmin(
    container,
    `Đơn ${sub.code} đã làm xong – cần tạo đơn vận chuyển`,
    paragraph(`Nghệ nhân <b>${escapeHtml(sub.artisan.shop_name)}</b> đã làm xong đơn ${sub.code}.`) +
      `<h4>Lấy hàng tại</h4>` +
      paragraph(
        `${escapeHtml(sub.artisan.shop_name)} – ${escapeHtml(sub.artisan.phone)}<br/>${escapeHtml(sub.artisan.pickup_address)}`
      ) +
      `<h4>Giao tới</h4>` +
      paragraph(
        `${escapeHtml(sub.shipping_name)} – ${escapeHtml(sub.shipping_phone)}<br/>${escapeHtml(sub.shipping_address)}`
      ) +
      `<h4>Hàng</h4>` +
      itemsTable(sub.items) +
      paragraph(
        sub.shipping_charged === null || sub.shipping_charged === undefined
          ? "Đơn đặt trước khi tính phí ship lúc thanh toán: người nhận trả phí ship cho GHN" +
              (sub.marketplace_order.payment_method === "cod"
                ? `, thu hộ COD <b>${formatVnd(sub.subtotal)}</b>.`
                : ".")
          : sub.marketplace_order.payment_method === "cod"
          ? `Thu hộ COD: <b>${formatVnd(subOrderAmount(sub))}</b> (tiền hàng + phí ship khách đã chịu). Yarnly trả phí GHN.`
          : "Khách đã trả trước tiền hàng và phí ship: shipper không thu gì. Yarnly trả phí GHN."
      )
  )
}

export async function emailShipping(
  container: MedusaContainer,
  sub: FullSubOrder
) {
  const tracking =
    sub.carrier === "GHN" && sub.tracking_number
      ? ` – <a href="https://donhang.ghn.vn/?order_code=${encodeURIComponent(sub.tracking_number)}">tra cứu</a>`
      : ""
  const legacy = sub.shipping_charged === null || sub.shipping_charged === undefined
  const pay = legacy
    ? sub.marketplace_order.payment_method === "cod"
      ? `Shipper thu tiền hàng <b>${formatVnd(sub.subtotal)}</b> và phí ship khi giao.`
      : "Phí ship trả cho shipper khi nhận hàng."
    : sub.marketplace_order.payment_method === "cod"
      ? `Shipper thu <b>${formatVnd(subOrderAmount(sub))}</b> (tiền hàng + phí ship) khi giao.`
      : "Bạn đã thanh toán tiền hàng và phí ship, shipper không thu thêm."

  await sendEmail(
    container,
    sub.marketplace_order.email,
    `Đơn ${sub.code} đang được giao`,
    paragraph(
      `Đơn vị vận chuyển: <b>${escapeHtml(sub.carrier)}</b><br/>Mã vận đơn: <b>${escapeHtml(sub.tracking_number)}</b>${tracking}`
    ) +
      paragraph(pay) +
      orderLink(sub)
  )
}

export async function emailDelivered(
  container: MedusaContainer,
  sub: FullSubOrder
) {
  await sendEmail(
    container,
    sub.marketplace_order.email,
    `Đơn ${sub.code} đã giao thành công`,
    paragraph(
      "Đơn hàng đã được giao. Đơn sẽ tự động hoàn thành sau 2 ngày."
    ) + orderLink(sub)
  )
}

export async function emailCompleted(
  container: MedusaContainer,
  sub: FullSubOrder
) {
  await sendEmail(
    container,
    sub.marketplace_order.email,
    `Đơn ${sub.code} đã hoàn thành`,
    paragraph("Cảm ơn bạn đã mua đồ handmade tại Yarnly!") + orderLink(sub)
  )
  await sendEmail(
    container,
    sub.artisan.email,
    `Đơn ${sub.code} đã hoàn thành`,
    paragraph(
      `Đơn ${sub.code} đã hoàn thành. <b>${formatVnd(sub.subtotal)}</b> sẽ được tính vào kỳ chuyển tiền thứ Hai tới.`
    )
  )
}

export async function emailRefunded(
  container: MedusaContainer,
  sub: FullSubOrder
) {
  await sendEmail(
    container,
    sub.marketplace_order.email,
    `Đã hoàn tiền đơn ${sub.code}`,
    paragraph(
      `Yarnly đã hoàn <b>${formatVnd(subOrderAmount(sub))}</b> cho đơn ${sub.code} vào tài khoản bạn đã chuyển.`
    )
  )
}
