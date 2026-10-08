import { listArtisanSubOrders } from "@lib/data/artisan-portal"
import SubOrderCard from "@modules/artisan-portal/components/sub-order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"

const TABS = [
  { status: "", label: "Tất cả" },
  { status: "pending_acceptance", label: "Chờ xác nhận" },
  { status: "processing", label: "Đang làm" },
  { status: "ready_to_ship", label: "Chờ giao" },
  { status: "shipping", label: "Đang giao" },
  { status: "completed", label: "Hoàn thành" },
  { status: "canceled", label: "Đã huỷ" },
]

/** Orders for listed products; custom-made ones live in "Đơn làm riêng". */
export default async function ArtisanOrdersPage(props: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status = "" } = await props.searchParams
  const subOrders = await listArtisanSubOrders(status || undefined, false)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl-semi">Đơn hàng có sẵn</h1>
        <p className="txt-small text-ui-fg-subtle">
          Đơn đặt sản phẩm đang bán. Đơn làm theo yêu cầu riêng xem ở{" "}
          <LocalizedClientLink href="/kenh-nghe-nhan/don-lam-rieng" className="text-violet-700 underline">
            Đơn làm riêng
          </LocalizedClientLink>
          .
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <LocalizedClientLink
            key={tab.status}
            href={`/kenh-nghe-nhan/don-hang${tab.status ? `?status=${tab.status}` : ""}`}
            className={clx(
              "rounded-full border px-3 py-1 txt-small",
              tab.status === status
                ? "border-violet-300 bg-violet-100 text-violet-800"
                : "border-gray-200 bg-white"
            )}
          >
            {tab.label}
          </LocalizedClientLink>
        ))}
      </div>
      {subOrders.length ? (
        <ul className="flex flex-col gap-3">
          {subOrders.map((subOrder) => (
            <li key={subOrder.id}>
              <SubOrderCard subOrder={subOrder} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="txt-medium text-ui-fg-subtle">Không có đơn nào.</p>
      )}
    </div>
  )
}
