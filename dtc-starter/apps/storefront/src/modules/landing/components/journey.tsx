"use client"

import Image from "next/image"
import { useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const steps = [
  {
    number: "01",
    label: "Khám phá",
    eyebrow: "TÌM MÓN HỢP VỚI BẠN",
    title: "Có một món len dành riêng cho nhịp sống của bạn.",
    description:
      "Dạo qua thú bông, phụ kiện và những món quà được móc bằng tay. Mỗi sản phẩm trên Yarnly đều đến từ một gian hàng thủ công.",
    image: "/images/cuu_hoa_len.jpg",
    alt: "Sản phẩm len hoa được móc thủ công",
    cardTitle: "Hoa len · làm thủ công",
    cardNote: "Một món quà nhỏ, nhiều điều để kể",
    action: "Xem sản phẩm",
    href: "/store",
  },
  {
    number: "02",
    label: "Gặp nghệ nhân",
    eyebrow: "BIẾT AI ĐÃ LÀM RA NÓ",
    title: "Phía sau mỗi mũi móc là một người yêu nghề.",
    description:
      "Tìm hiểu gian hàng, phong cách và những món đồ người nghệ nhân làm nên. Khi biết người tạo ra sản phẩm, món quà cũng trở nên gần gũi hơn.",
    image: "/images/crochet_bear.png",
    alt: "Gấu bông len thủ công Yarnly",
    cardTitle: "Gian hàng của nghệ nhân",
    cardNote: "Đồ len được làm bằng đôi tay thật",
    action: "Gặp gỡ nghệ nhân",
    href: "/nghe-nhan",
  },
  {
    number: "03",
    label: "Đặt làm riêng",
    eyebrow: "BIẾN Ý TƯỞNG THÀNH MÓN QUÀ",
    title: "Chọn màu sắc, hình dáng và điều bạn muốn gửi gắm.",
    description:
      "Bạn có thể gửi yêu cầu làm riêng cho món quà đang hình dung. Yarnly giúp bạn kết nối với nghệ nhân để cùng trao đổi chi tiết.",
    image: "/images/moc_khoa.jpg",
    alt: "Móc khóa len handmade với những bông hoa nhỏ",
    cardTitle: "Một yêu cầu làm riêng",
    cardNote: "Trao đổi trực tiếp về món đồ bạn muốn",
    action: "Gửi yêu cầu",
    href: "/account/yeu-cau-lam-rieng",
  },
]

export default function Journey() {
  const [activeStep, setActiveStep] = useState(0)
  const step = steps[activeStep]

  return (
    <section
      id="cach-yarnly-hoat-dong"
      className="scroll-mt-12 bg-[var(--yarnly-paper)] py-20 md:py-28"
    >
      <div className="content-container">
        <div className="grid gap-8 border-b border-[var(--yarnly-line)] pb-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--yarnly-terracotta)]">
              Cách Yarnly kết nối
            </p>
            <h2 className="max-w-xl font-serif text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-[var(--yarnly-ink)] md:text-6xl">
              Từ cuộn len đến món quà của bạn.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--yarnly-muted)] md:ml-auto md:text-lg">
            Bắt đầu với một món đồ bạn yêu. Yarnly đưa bạn đến gần hơn với
            người làm ra nó và giúp bạn biến ý tưởng riêng thành sản phẩm thủ
            công.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Các bước trên Yarnly">
          {steps.map((item, index) => (
            <button
              key={item.number}
              type="button"
              aria-pressed={activeStep === index}
              onClick={() => setActiveStep(index)}
              className={`inline-flex min-h-11 items-center gap-3 rounded-full border px-4 py-2 text-sm transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)] ${
                activeStep === index
                  ? "border-[var(--yarnly-ink)] bg-[var(--yarnly-ink)] text-white"
                  : "border-[var(--yarnly-line)] bg-white text-[var(--yarnly-muted)] hover:border-[var(--yarnly-ink)] hover:text-[var(--yarnly-ink)]"
              }`}
            >
              <span className="font-serif italic">{item.number}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div
          key={step.number}
          className="mt-8 grid overflow-hidden rounded-[2rem] border border-[var(--yarnly-line)] bg-white shadow-[0_24px_70px_rgba(54,43,36,0.08)] lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="flex flex-col items-start justify-center p-7 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--yarnly-terracotta)]">
              {step.eyebrow}
            </p>
            <h3 className="mt-5 max-w-lg font-serif text-3xl font-medium leading-tight tracking-[-0.035em] text-[var(--yarnly-ink)] md:text-5xl">
              {step.title}
            </h3>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--yarnly-muted)]">
              {step.description}
            </p>
            <LocalizedClientLink
              href={step.href}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[var(--yarnly-ink)] px-6 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
            >
              {step.action} <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
          </div>

          <div className="relative min-h-[360px] overflow-hidden bg-[var(--yarnly-cream)] p-5 md:min-h-[520px] md:p-8">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[var(--yarnly-line)]" />
            <div className="absolute -bottom-20 -left-14 h-64 w-64 rounded-full border border-[var(--yarnly-line)]" />
            <figure className="relative h-full min-h-[320px] overflow-hidden rounded-[1.5rem] bg-[#e9e1d3] md:min-h-[456px] md:rounded-[1.75rem]">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-[var(--yarnly-paper)]/95 p-4 shadow-lg backdrop-blur md:inset-x-5 md:bottom-5 md:p-5">
                <div>
                  <p className="text-sm font-semibold text-[var(--yarnly-ink)] md:text-base">
                    {step.cardTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--yarnly-muted)] md:text-sm">
                    {step.cardNote}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--yarnly-olive)] font-serif text-lg text-white"
                >
                  {step.number}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
