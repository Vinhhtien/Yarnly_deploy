import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FeatureSections from "@modules/landing/components/feature-sections"
import LandingHeader from "@modules/landing/components/landing-header"
import PixelIcon from "@modules/landing/components/pixel-icon"
import PixelLandscape from "@modules/landing/components/pixel-landscape"
import styles from "./yarnly-landing.module.css"
import shell from "./landing-shell.module.css"

const categories = [
  { name: "Thú bông", icon: "heart" as const },
  { name: "Phụ kiện", icon: "yarn" as const },
  { name: "Hoa len", icon: "flower" as const },
  { name: "Quà làm riêng", icon: "gift" as const },
]

const products = [
  {
    name: "Gấu bông len",
    image: "/images/crochet_bear.png",
    note: "Nhỏ xinh, mềm mại",
  },
  {
    name: "Hoa len thủ công",
    image: "/images/cuu_hoa_len.jpg",
    note: "Một món quà bền lâu",
  },
  {
    name: "Móc khóa hoa",
    image: "/images/moc_khoa.jpg",
    note: "Mang theo chút dịu dàng",
  },
]

const chapters = [
  {
    number: "01",
    name: "Tìm món đồ",
    note: "Khám phá đồ len handmade",
    href: "/store",
    icon: "yarn" as const,
  },
  {
    number: "02",
    name: "Gặp người làm",
    note: "Ghé thăm các gian hàng",
    href: "/nghe-nhan",
    icon: "heart" as const,
  },
  {
    number: "03",
    name: "Đặt món riêng",
    note: "Gửi ý tưởng của bạn",
    href: "/account/yeu-cau-lam-rieng",
    icon: "gift" as const,
  },
  {
    number: "04",
    name: "Mở gian hàng",
    note: "Kể câu chuyện bằng len",
    href: "/kenh-nghe-nhan/dang-ky",
    icon: "flower" as const,
  },
]

function PixelEdge({ top = false }: { top?: boolean }) {
  return (
    <svg
      className={top ? shell.pixelEdgeTop : shell.pixelEdge}
      viewBox="0 0 1200 20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 10h12V3h9v12h15V8h8V0h8v12h15V6h12v9h18V2h9v8h14v7h15V6h10v8h20V3h7v9h23v5h15V2h9v13h20V7h9v5h23V2h8v14h22V7h15v6h19V1h8v9h25v6h13V4h9v9h24V2h8v14h21V5h13v7h25V1h8v13h22V6h13v10h20V3h8v9h25V6h12v9h20V1h8v10h23v5h15V4h8v9h25V2h8v14h20V5h13v8h24V1h8v10h23v5h14V4h9v9h24V2h8v14h20V5h13v7h25V1h8v13h22V6h13v10h20V3h8v9h25V6h12v9h20V1h8v10h23v5h15V4h8v9h25V2h8v14h20V5h13v8h24V1h8v10h23v9H0z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function YarnlyLanding() {
  return (
    <div className={styles.page}>
      <LandingHeader />

      <section className={shell.hero} aria-labelledby="landing-title">
        <PixelLandscape />
        <div className={shell.heroShade} />
        <div className={shell.heroInner}>
          <h1 id="landing-title">
            Yarnly kết nối bạn với
            <br className={styles.desktopBreak} /> thế giới len thủ công.
          </h1>
          <p>
            Từ một món đồ bạn yêu, đến người nghệ nhân làm ra nó.
            <br className={styles.desktopBreak} /> Khám phá, gặp gỡ và cùng tạo
            nên điều đặc biệt.
          </p>
          <div className={styles.actions}>
            <LocalizedClientLink href="/" className={styles.lightButton}>
              Khám phá Yarnly <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
            <a href="#cau-chuyen" className={styles.glassButton}>
              Câu chuyện của chúng mình
            </a>
          </div>
        </div>
        <div className={shell.heroNotes} aria-label="Giá trị Yarnly">
          <div>
            <i />
            <span>Từng mũi móc</span>
            <strong>Làm bằng tay</strong>
          </div>
          <div>
            <i />
            <span>Sắc màu của bạn</span>
            <strong>Đặt làm riêng</strong>
          </div>
          <div>
            <i />
            <span>Từ nghệ nhân Việt</span>
            <strong>Gửi trọn yêu thương</strong>
          </div>
        </div>
        <PixelEdge />
      </section>

      <section
        className={styles.categoryStrip}
        aria-label="Các món đồ trên Yarnly"
      >
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <LocalizedClientLink
              key={category.name}
              href="/store"
              className={styles.categoryTile}
            >
              <PixelIcon kind={category.icon} />
              <span>{category.name}</span>
            </LocalizedClientLink>
          ))}
        </div>
        <p>Những món len nhỏ. Những câu chuyện rất riêng.</p>
      </section>

      <section
        id="cau-chuyen"
        className={styles.overview}
        aria-labelledby="overview-title"
      >
        <h2 id="overview-title" className={styles.centerHeading}>
          Yarnly là nơi người yêu đồ thủ công
          <br />
          <span>gặp những đôi tay làm nên điều đặc biệt.</span>
        </h2>
        <div className={styles.workspace}>
          <div className={styles.workspaceBar}>
            <span className={styles.miniBrand}>Yarnly</span>
            <span>Một góc thế giới handmade</span>
            <LocalizedClientLink href="/store">
              Khám phá tất cả ↗
            </LocalizedClientLink>
          </div>
          <div className={styles.workspaceBody}>
            <div className={styles.productGallery}>
              <div className={styles.galleryHeading}>
                <span>Được làm bằng đôi tay thật</span>
                <span>Thú bông · Hoa · Phụ kiện</span>
              </div>
              <div className={styles.productGrid}>
                {products.map((product) => (
                  <LocalizedClientLink
                    href="/store"
                    key={product.name}
                    className={styles.productCard}
                  >
                    <div className={styles.productImage}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 680px) 42vw, 22vw"
                      />
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.note}</p>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
            <aside className={styles.makerNote}>
              <PixelIcon kind="flower" />
              <p>
                Mỗi sản phẩm bắt đầu
                <br />
                từ một người yêu nghề.
              </p>
              <span>
                Tìm hiểu gian hàng, khám phá phong cách và chọn món đồ mang dấu
                ấn người làm.
              </span>
              <LocalizedClientLink href="/nghe-nhan">
                Gặp gỡ nghệ nhân <span aria-hidden="true">↗</span>
              </LocalizedClientLink>
            </aside>
          </div>
        </div>
        <div className={styles.overviewBenefits}>
          <p>
            <PixelIcon kind="yarn" />
            <span>
              <strong>Thủ công từng món</strong> — Những mũi len mang theo thời
              gian, sự kiên nhẫn và cá tính của người làm.
            </span>
          </p>
          <p>
            <PixelIcon kind="heart" />
            <span>
              <strong>Kết nối gần hơn</strong> — Biết ai đứng sau sản phẩm và
              ghé thăm gian hàng của người nghệ nhân.
            </span>
          </p>
          <p>
            <PixelIcon kind="gift" />
            <span>
              <strong>Dành riêng cho bạn</strong> — Trao đổi ý tưởng, màu sắc và
              chi tiết để tạo nên món quà của riêng mình.
            </span>
          </p>
        </div>
        <div className={styles.smallCta}>
          <h3>Bắt đầu bằng một món đồ bạn yêu.</h3>
          <p>Ghé Yarnly và tìm một chút dịu dàng cho ngày thường.</p>
          <LocalizedClientLink href="/" className={styles.darkButton}>
            Vào Yarnly <span aria-hidden="true">↗</span>
          </LocalizedClientLink>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>YARNLY MANG ĐẾN ĐIỀU GÌ</p>
          <h2>
            Tìm món đồ bạn yêu.
            <br />
            <span>Gặp người làm nên món đồ ấy.</span>
          </h2>
          <p>
            Từ khám phá sản phẩm đến đặt làm riêng, mỗi bước đều giúp bạn
            <br className={styles.desktopBreak} /> đến gần hơn với thế giới đồ
            len thủ công.
          </p>
        </div>
        <FeatureSections />
      </section>

      <section id="bat-dau" className={styles.chaptersSection}>
        <div className={styles.sectionIntro}>
          <h2>Bắt đầu với điều bạn yêu.</h2>
          <p>Một món quà, một cuộc gặp, hay một gian hàng của riêng mình.</p>
          <LocalizedClientLink href="/" className={styles.darkButton}>
            Cùng khám phá <span aria-hidden="true">↗</span>
          </LocalizedClientLink>
        </div>
        <div className={styles.chapterGrid}>
          {chapters.map((chapter) => (
            <LocalizedClientLink
              key={chapter.number}
              href={chapter.href}
              className={styles.chapterCard}
            >
              <div className={styles.chapterTop}>
                <span>CHƯƠNG {chapter.number}</span>
                <span>YARNLY</span>
              </div>
              <h3>{chapter.name}</h3>
              <PixelIcon kind={chapter.icon} />
              <div className={styles.chapterBottom}>
                <span>{chapter.note}</span>
                <span aria-hidden="true">↗</span>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </section>

      <section className={styles.craftSection}>
        <div className={styles.craftCopy}>
          <p className={styles.eyebrow}>THÊM MỘT CHÚT CHẬM RÃI</p>
          <h2>
            Đẹp vì có người
            <br />
            làm ra nó.
          </h2>
          <p>
            Đồ thủ công lưu lại cả hành trình. Từng vòng len, lần đổi màu và
            chút chăm chút cuối cùng đều trở thành một phần câu chuyện.
          </p>
          <details open>
            <summary>
              Nhìn thấy sự chăm chút<span aria-hidden="true">+</span>
            </summary>
            <p>
              Một món đồ có thể nhỏ, nhưng cần nhiều thời gian và sự kiên nhẫn
              để hoàn thiện.
            </p>
          </details>
          <details>
            <summary>
              Trân trọng người làm nghề<span aria-hidden="true">+</span>
            </summary>
            <p>
              Ghé thăm các gian hàng và khám phá dấu ấn riêng của từng nghệ
              nhân.
            </p>
          </details>
          <details>
            <summary>
              Giữ lại một món quà lâu hơn<span aria-hidden="true">+</span>
            </summary>
            <p>
              Chọn món đồ gắn với câu chuyện, sở thích hoặc người mà bạn muốn
              gửi tặng.
            </p>
          </details>
        </div>
        <figure className={styles.craftVideo}>
          <video
            autoPlay
            muted
            loop
            disablePictureInPicture
            playsInline
            preload="metadata"
            poster="/images/crochet_bear.png"
            aria-label="Quá trình móc len bằng tay"
          >
            <source
              src="https://videos.pexels.com/video-files/7578126/7578126-hd_1080_1920_24fps.mp4"
              type="video/mp4"
            />
            Trình duyệt không hỗ trợ video.
          </video>
          <figcaption>
            Một chút yên bình trong từng mũi móc.
            <a
              href="https://www.pexels.com/video/woman-doing-crochet-7578126/"
              target="_blank"
              rel="noreferrer"
            >
              Miriam Alonso / Pexels ↗
            </a>
          </figcaption>
        </figure>
      </section>

      <section className={styles.wordSection}>
        <h2>Len thủ công cho những điều rất đời thường.</h2>
        <p>
          Món quà nhỏ, phụ kiện xinh hay một người bạn bằng len.
          <br />
          Luôn có một câu chuyện bắt đầu từ đây.
        </p>
        <div className={styles.wordGrid} aria-hidden="true">
          {[
            "QWERTYUIOPASDFGHJK",
            "MNYARNLYBCXZLKJHGF",
            "ASDFGHJKLQWERTYUIO",
            "POIUHANDMADEYTREWQ",
            "ZXCVBNMASDFGHJKLPO",
            "ASQUATANGDFGHJKLZX",
            "QWERTYUIOPASDFGHJK",
          ].flatMap((line, row) =>
            line
              .slice(0, 18)
              .split("")
              .map((letter, col) => (
                <span
                  key={row + "-" + col}
                  className={
                    (row === 1 && col >= 2 && col < 8) ||
                    (row === 3 && col >= 4 && col < 12) ||
                    (row === 5 && col >= 2 && col < 9)
                      ? styles.wordHighlight
                      : undefined
                  }
                >
                  {letter}
                </span>
              ))
          )}
        </div>
      </section>

      <footer className={shell.footer}>
        <PixelLandscape variant="footer" />
        <div className={shell.footerShade} />
        <PixelEdge top />
        <div className={shell.footerInner}>
          <h2>
            Một món len nhỏ.
            <br />
            Một câu chuyện của bạn.
          </h2>
          <LocalizedClientLink href="/" className={styles.lightButton}>
            Khám phá Yarnly <span aria-hidden="true">↗</span>
          </LocalizedClientLink>
          <div className={shell.footerBottom}>
            <div>
              <LocalizedClientLink href="/ve-yarnly" className={shell.brand}>
                Yarnly
              </LocalizedClientLink>
              <p>
                Nơi người yêu đồ len thủ công
                <br />
                gặp những nghệ nhân Việt.
              </p>
            </div>
            <nav aria-label="Liên kết cuối trang">
              <LocalizedClientLink href="/">Trang chủ</LocalizedClientLink>
              <LocalizedClientLink href="/store">Sản phẩm</LocalizedClientLink>
              <LocalizedClientLink href="/nghe-nhan">
                Nghệ nhân
              </LocalizedClientLink>
              <LocalizedClientLink href="/kenh-nghe-nhan/dang-ky">
                Mở gian hàng
              </LocalizedClientLink>
              <LocalizedClientLink href="/account">
                Tài khoản
              </LocalizedClientLink>
            </nav>
          </div>
          <div className={shell.copyright}>
            <span>© {new Date().getFullYear()} Yarnly</span>
            <span>Được kết nối bằng những mũi len.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
