import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--yarnly-paper)] pb-14 pt-10 md:pb-20 md:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-12 h-96 w-96 rounded-full bg-[var(--yarnly-blush)] opacity-60 blur-3xl"
      />
      <div className="content-container relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--yarnly-terracotta)]">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Chợ đồ len handmade Việt Nam
          </p>
          <h1 className="font-serif text-[clamp(3rem,7vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[var(--yarnly-ink)]">
            Mỗi mũi len
            <br />
            <span className="italic text-[var(--yarnly-terracotta)]">một câu chuyện.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[var(--yarnly-muted)] md:text-lg md:leading-8">
            Khám phá những món đồ len được làm bằng đôi tay thật — từ thú bông
            nhỏ xinh đến phụ kiện ấm áp, mỗi món đều có một người nghệ nhân đứng
            sau.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#san-pham"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--yarnly-ink)] px-7 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
            >
              Khám phá sản phẩm <span aria-hidden="true" className="ml-3">↗</span>
            </a>
            <LocalizedClientLink
              href="/nghe-nhan"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--yarnly-line)] px-7 text-sm font-semibold text-[var(--yarnly-ink)] transition duration-200 hover:border-[var(--yarnly-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
            >
              Gặp gỡ nghệ nhân
            </LocalizedClientLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[var(--yarnly-line)] pt-5 text-sm text-[var(--yarnly-muted)]">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--yarnly-olive)]" />
              Làm thủ công từng món
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--yarnly-terracotta)]" />
              Đặt làm theo ý bạn
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[690px] lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute -left-5 top-10 h-44 w-44 rounded-full border border-dashed border-[var(--yarnly-line)] md:-left-12 md:top-14 md:h-64 md:w-64"
          />
          <div className="relative ml-[8%] grid aspect-[1.03] grid-cols-[1.25fr_0.75fr] grid-rows-[1fr_0.75fr] gap-3 md:ml-[10%] md:gap-4">
            <figure className="relative row-span-2 overflow-hidden rounded-[1.5rem] bg-[#e9e1d3] md:rounded-[2rem]">
              <Image
                src="/images/crochet_bear.png"
                alt="Gấu bông len thủ công bên cuộn len"
                fill
                priority
                sizes="(max-width: 768px) 62vw, 38vw"
                className="object-cover object-center transition duration-700 hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-2 text-[11px] font-medium text-[var(--yarnly-ink)] shadow-sm backdrop-blur md:bottom-5 md:left-5 md:px-4 md:text-xs">
                Mềm mại từ mũi len đầu tiên
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.5rem] bg-[#e8e4d7] md:rounded-[2rem]">
              <Image
                src="/images/cuu_hoa_len.jpg"
                alt="Hoa cừu len được móc thủ công"
                fill
                sizes="(max-width: 768px) 35vw, 22vw"
                className="object-cover object-center transition duration-700 hover:scale-[1.04]"
              />
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium text-[var(--yarnly-ink)] backdrop-blur md:bottom-4 md:left-4 md:text-xs">
                Hoa len · làm riêng
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.5rem] bg-[#eee7ef] md:rounded-[2rem]">
              <Image
                src="/images/moc_khoa.jpg"
                alt="Móc khóa len hình bó hoa"
                fill
                sizes="(max-width: 768px) 35vw, 22vw"
                className="object-cover object-center transition duration-700 hover:scale-[1.04]"
              />
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium text-[var(--yarnly-ink)] backdrop-blur md:bottom-4 md:left-4 md:text-xs">
                Quà nhỏ, thương thật lâu
              </figcaption>
            </figure>
          </div>
          <div className="absolute -top-4 right-2 z-10 rounded-full bg-[var(--yarnly-olive)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-md md:right-4 md:px-5 md:py-3 md:text-xs">
            Làm bằng yêu thương
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
