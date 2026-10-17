import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Journey from "@modules/landing/components/journey"

const YarnlyLanding = () => {
  return (
    <div className="overflow-hidden bg-[var(--yarnly-paper)] text-[var(--yarnly-ink)]">
      <div className="content-container">
        <nav
          aria-label="Điều hướng trang giới thiệu Yarnly"
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-[var(--yarnly-line)] py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--yarnly-muted)]"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8">
            <a
              className="inline-flex min-h-11 items-center transition hover:text-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
              href="#cau-chuyen"
            >
              Câu chuyện
            </a>
            <a
              className="inline-flex min-h-11 items-center transition hover:text-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
              href="#cach-yarnly-hoat-dong"
            >
              Cách hoạt động
            </a>
            <a
              className="inline-flex min-h-11 items-center transition hover:text-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
              href="#nghe-nhan"
            >
              Dành cho nghệ nhân
            </a>
          </div>
          <LocalizedClientLink
            href="/store"
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--yarnly-ink)] px-5 text-white transition hover:bg-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
          >
            Khám phá Yarnly <span aria-hidden="true" className="ml-2">↗</span>
          </LocalizedClientLink>
        </nav>
      </div>

      <section className="relative bg-[var(--yarnly-paper)] pb-16 pt-12 md:pb-24 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-[var(--yarnly-blush)] opacity-50 blur-3xl"
        />
        <div className="content-container relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--yarnly-terracotta)]">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              Mỗi món đồ có người làm ra nó
            </p>
            <h1 className="font-serif text-[clamp(3.25rem,7vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[var(--yarnly-ink)]">
              Gặp người làm nên món đồ bạn yêu.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--yarnly-muted)] md:text-lg md:leading-8">
              Yarnly kết nối người yêu đồ len handmade với những nghệ nhân Việt
              Nam. Khám phá sản phẩm, tìm hiểu câu chuyện phía sau và đặt làm
              riêng điều bạn đang hình dung.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LocalizedClientLink
                href="/store"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--yarnly-ink)] px-7 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
              >
                Tìm món đồ thủ công <span aria-hidden="true" className="ml-3">↗</span>
              </LocalizedClientLink>
              <a
                href="#cach-yarnly-hoat-dong"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--yarnly-line)] px-7 text-sm font-semibold text-[var(--yarnly-ink)] transition duration-200 hover:border-[var(--yarnly-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
              >
                Tìm hiểu Yarnly
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[720px] lg:ml-auto">
            <div className="absolute -left-5 top-10 h-40 w-40 rounded-full border border-dashed border-[var(--yarnly-line)] md:-left-10 md:top-16 md:h-64 md:w-64" />
            <div className="relative ml-[7%] rounded-[2rem] bg-[var(--yarnly-cream)] p-3 shadow-[0_28px_80px_rgba(54,43,36,0.12)] md:ml-[9%] md:rounded-[2.5rem] md:p-5">
              <div className="rounded-[1.5rem] border border-white/80 bg-white/80 p-4 md:rounded-[2rem] md:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--yarnly-line)] pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--yarnly-terracotta)]">
                      YARNLY · GIAN HÀNG THỦ CÔNG
                    </p>
                    <p className="mt-1 font-serif text-xl text-[var(--yarnly-ink)] md:text-2xl">
                      Những món được làm bằng tay
                    </p>
                  </div>
                  <span className="rounded-full bg-[#e8eddf] px-3 py-2 text-xs font-semibold text-[#536244]">
                    Từ nghệ nhân Việt
                  </span>
                </div>

                <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 md:gap-4">
                  <figure className="relative min-h-[300px] overflow-hidden rounded-[1.25rem] bg-[#e9e1d3] md:min-h-[430px] md:rounded-[1.5rem]">
                    <Image
                      src="/images/crochet_bear.png"
                      alt="Gấu bông len được móc thủ công"
                      fill
                      priority
                      sizes="(max-width: 768px) 54vw, 34vw"
                      className="object-cover"
                    />
                    <figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-[var(--yarnly-paper)]/95 p-3 backdrop-blur md:inset-x-4 md:bottom-4 md:rounded-2xl md:p-4">
                      <p className="text-sm font-semibold text-[var(--yarnly-ink)] md:text-base">
                        Một món đồ, một đôi tay
                      </p>
                      <p className="mt-1 text-xs text-[var(--yarnly-muted)] md:text-sm">
                        Từng mũi móc đều có chủ ý
                      </p>
                    </figcaption>
                  </figure>

                  <div className="flex flex-col gap-3 md:gap-4">
                    <figure className="relative min-h-[180px] flex-1 overflow-hidden rounded-[1.25rem] bg-[#e8e4d7] md:min-h-[240px] md:rounded-[1.5rem]">
                      <Image
                        src="/images/cuu_hoa_len.jpg"
                        alt="Hoa cừu len thủ công"
                        fill
                        sizes="(max-width: 768px) 38vw, 24vw"
                        className="object-cover"
                      />
                    </figure>
                    <div className="flex flex-1 flex-col justify-between rounded-[1.25rem] bg-[var(--yarnly-olive)] p-4 text-white md:rounded-[1.5rem] md:p-6">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/75">
                        Được làm bằng tay
                      </span>
                      <p className="mt-8 font-serif text-2xl leading-tight md:text-3xl">
                        Đẹp vì có người làm ra nó.
                      </p>
                      <a
                        href="#cau-chuyen"
                        className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Đọc câu chuyện <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-1 top-3 rounded-full bg-[var(--yarnly-terracotta)] px-4 py-2 text-xs font-semibold text-white shadow-md md:right-3 md:top-6 md:px-5 md:py-3 md:text-sm">
              Handmade · Việt Nam
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--yarnly-line)] bg-white py-6 md:py-8">
        <div className="content-container grid gap-5 sm:grid-cols-3 sm:gap-8">
          <div className="flex items-center gap-4">
            <span className="font-serif text-2xl italic text-[var(--yarnly-terracotta)]">01</span>
            <p className="text-sm font-semibold text-[var(--yarnly-ink)] md:text-base">Sản phẩm làm thủ công</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-serif text-2xl italic text-[var(--yarnly-terracotta)]">02</span>
            <p className="text-sm font-semibold text-[var(--yarnly-ink)] md:text-base">Gian hàng của nghệ nhân</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-serif text-2xl italic text-[var(--yarnly-terracotta)]">03</span>
            <p className="text-sm font-semibold text-[var(--yarnly-ink)] md:text-base">Có thể gửi yêu cầu làm riêng</p>
          </div>
        </div>
      </section>

      <Journey />

      <section id="cau-chuyen" className="scroll-mt-12 bg-[var(--yarnly-plum)] py-20 text-white md:py-28">
        <div className="content-container grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#efc2aa]">
              CÂU CHUYỆN YARNLY
            </p>
            <h2 className="max-w-xl font-serif text-4xl font-medium leading-[1.03] tracking-[-0.045em] md:text-6xl">
              Sợi len nối người làm với người trân trọng.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/75 md:text-lg">
              Mỗi món đồ thủ công lưu lại thời gian, sự kiên nhẫn và cá tính của
              người làm. Yarnly giúp câu chuyện ấy đi cùng sản phẩm đến đúng
              người yêu thích nó.
            </p>
            <LocalizedClientLink
              href="/nghe-nhan"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--yarnly-paper)] px-7 text-sm font-semibold text-[var(--yarnly-ink)] transition duration-200 hover:bg-[#efc2aa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Gặp gỡ nghệ nhân <span aria-hidden="true" className="ml-3">↗</span>
            </LocalizedClientLink>
          </div>

          <div className="grid grid-cols-[1.05fr_0.95fr] items-center gap-3 md:gap-5">
            <figure className="overflow-hidden rounded-[1.5rem] bg-white/10 md:rounded-[2rem]">
              <video
                className="aspect-[9/14] w-full object-cover"
                controls
                playsInline
                preload="none"
                poster="/images/crochet_bear.png"
                aria-label="Video nghệ nhân đang móc len bằng tay"
              >
                <source
                  src="https://videos.pexels.com/video-files/7578126/7578126-hd_1080_1920_24fps.mp4"
                  type="video/mp4"
                />
                Trình duyệt của bạn không hỗ trợ phát video.
              </video>
              <figcaption className="flex flex-wrap justify-between gap-2 px-4 py-3 text-xs text-white/70 md:px-5">
                <span>Một chút yên bình trong từng mũi móc</span>
                <a
                  href="https://www.pexels.com/video/woman-doing-crochet-7578126/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-white"
                >
                  Video: Miriam Alonso / Pexels
                </a>
              </figcaption>
            </figure>
            <div className="space-y-3 md:space-y-5">
              <figure className="relative aspect-[0.9] overflow-hidden rounded-[1.5rem] bg-[#e8e4d7] md:rounded-[2rem]">
                <Image
                  src="/images/moc_khoa.jpg"
                  alt="Móc khóa len hoa được làm thủ công"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover"
                />
              </figure>
              <figure className="relative aspect-[1.15] overflow-hidden rounded-[1.5rem] bg-[#e9e1d3] md:rounded-[2rem]">
                <Image
                  src="/images/mu_len.jpg"
                  alt="Mũ len handmade"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="nghe-nhan" className="scroll-mt-12 bg-[var(--yarnly-cream)] py-20 md:py-28">
        <div className="content-container grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--yarnly-terracotta)]">
              DÀNH CHO NGƯỜI LÀM LEN
            </p>
            <h2 className="font-serif text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[var(--yarnly-ink)] md:text-6xl">
              Đưa những món đồ bạn làm đến gần người yêu chúng.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--yarnly-muted)] md:text-lg">
              Tạo gian hàng Yarnly để giới thiệu sản phẩm handmade, nhận đơn và
              kể câu chuyện đằng sau từng thiết kế.
            </p>
          </div>
          <LocalizedClientLink
            href="/kenh-nghe-nhan/dang-ky"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--yarnly-ink)] px-7 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--yarnly-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yarnly-terracotta)]"
          >
            Mở gian hàng <span aria-hidden="true" className="ml-3">↗</span>
          </LocalizedClientLink>
        </div>
      </section>
    </div>
  )
}

export default YarnlyLanding
