import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import styles from "../home-editorial.module.css"

const Hero = () => (
  <>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.intro}>
        <span>Yarnly / Đồ len thủ công Việt Nam</span>
        <span>Từ đôi tay người làm, đến trái tim người nhận</span>
      </div>
      <h1 id="home-title" className={styles.title}>
        Đồ len nhỏ.
        <br />
        <span>Thương thật nhiều.</span>
      </h1>
      <p className={styles.heroDescription}>
        Những món đồ được làm chậm, để thương thật lâu.
        <br />
        Tìm món len bạn yêu và gặp người nghệ nhân làm nên nó.
      </p>
      <div className={styles.actions}>
        <a href="#san-pham" className={styles.button}>
          Khám phá bộ sưu tập <span aria-hidden="true">↗</span>
        </a>
        <LocalizedClientLink href="/nghe-nhan" className={styles.textLink}>
          Gặp người làm len <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
      </div>
      <figure className={styles.heroFigure}>
        <Image
          src="/images/yarnly-handmade-edit.webp"
          alt="Túi móc hoa, hoa tulip len và thỏ bông thủ công trên bàn vải màu đào"
          width={1672}
          height={941}
          priority
          sizes="(max-width: 760px) calc(100vw - 40px), 1360px"
          className={styles.heroImage}
        />
        <figcaption className={styles.imageLabel}>
          Một góc cảm hứng handmade / Yarnly
        </figcaption>
      </figure>
    </section>
    <div className={styles.values} aria-label="Tinh thần Yarnly">
      <span>Làm bằng đôi tay</span>
      <span>Mang dấu ấn người làm</span>
      <span>Dành riêng cho bạn</span>
    </div>
  </>
)

export default Hero
