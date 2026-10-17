import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const makingSteps = [
  {
    number: "01",
    title: "Tìm món đồ hợp với bạn",
    description: "Chọn từ thú bông, phụ kiện, túi và những món len thường ngày.",
  },
  {
    number: "02",
    title: "Biết ai đang làm món ấy",
    description: "Mỗi sản phẩm gắn với gian hàng của người nghệ nhân tạo ra nó.",
  },
  {
    number: "03",
    title: "Đặt riêng theo ý mình",
    description: "Gửi yêu cầu về màu sắc, kích thước hoặc món quà bạn đang hình dung.",
  },
]

const HomeStory = () => {
  return (
    <>
      <section className="bg-[var(--yarnly-cream)] py-20 md:py-28">
        <div className="content-container grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--yarnly-terracotta)]">
              Từ cuộn len đến món quà
            </p>
            <h2 className="max-w-xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-[var(--yarnly-ink)] md:text-6xl">
              Đẹp vì có người làm ra nó.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[var(--yarnly-muted)]">
              Yarnly đưa bạn đến gần những người yêu nghề móc len. Xem cách một
              món đồ được tạo nên, tìm người làm bạn yêu mến và đặt một món thật
              riêng cho mình.
            </p>

            <ol className="mt-9 space-y-6">
              {makingSteps.map((step) => (
                <li key={step.number} className="flex gap-4 border-t border-[var(--yarnly-line)] pt-5">
                  <span className="font-serif text-xl italic text-[var(--yarnly-terracotta)]">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--yarnly-ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--yarnly-muted)]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <LocalizedClientLink
              href="/nghe-nhan"
              className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full text-sm font-semibold text-[var(--yarnly-terracotta)] transition hover:gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--yarnly-terracotta)]"
            >
              Khám phá các gian hàng <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
          </div>

          <div className="grid grid-cols-[1.06fr_0.94fr] items-center gap-3 md:gap-5">
            <figure className="overflow-hidden rounded-[1.5rem] bg-[#e9e1d3] shadow-sm md:rounded-[2rem]">
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
              <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 text-xs text-[var(--yarnly-muted)] md:px-5">
                <span>Một chút yên bình trong từng mũi móc</span>
                <a
                  href="https://www.pexels.com/video/woman-doing-crochet-7578126/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[var(--yarnly-line)] underline-offset-2 hover:text-[var(--yarnly-ink)]"
                >
                  Video: Miriam Alonso / Pexels
                </a>
              </figcaption>
            </figure>

            <div className="space-y-3 md:space-y-5">
              <figure className="relative aspect-[0.9] overflow-hidden rounded-[1.5rem] bg-[#e6e0d3] md:rounded-[2rem]">
                <Image
                  src="/images/cuu_hoa_len.jpg"
                  alt="Bông hoa cừu len được móc bằng tay"
                  fill
                  sizes="(max-width: 768px) 38vw, 24vw"
                  className="object-cover"
                />
              </figure>
              <figure className="relative aspect-[1.15] overflow-hidden rounded-[1.5rem] bg-[#eee7ef] md:rounded-[2rem]">
                <Image
                  src="/images/moc_khoa.jpg"
                  alt="Móc khóa len handmade với những bông hoa nhỏ"
                  fill
                  sizes="(max-width: 768px) 38vw, 24vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yarnly-plum)] py-16 text-white md:py-20">
        <div className="content-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#efc2aa]">
              Dành cho người làm len
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.03em] md:text-5xl">
              Đôi tay bạn làm nên điều đặc biệt.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 md:text-base">
              Mở gian hàng Yarnly để giới thiệu sản phẩm, nhận đơn hàng và kết
              nối với những người trân trọng đồ thủ công.
            </p>
          </div>
          <LocalizedClientLink
            href="/kenh-nghe-nhan/dang-ky"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[var(--yarnly-paper)] px-7 text-sm font-semibold text-[var(--yarnly-ink)] transition duration-200 hover:bg-[#efc2aa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Trở thành nghệ nhân <span aria-hidden="true" className="ml-3">↗</span>
          </LocalizedClientLink>
        </div>
      </section>
    </>
  )
}

export default HomeStory
