import LocalizedClientLink from "@modules/common/components/localized-client-link"
import styles from "./hero.module.css"

const Hero = () => (
  <section className={styles.hero} aria-labelledby="home-title">
    <video
      className={styles.video}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="auto"
      poster="/images/yarnly-crochet-film-poster.webp"
      aria-label="Đôi tay nghệ nhân đang móc từng mũi len"
    >
      <source src="/videos/yarnly-crochet-workshop.mp4" type="video/mp4" />
    </video>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.content}>
      <p className={styles.eyebrow}>Yarnly / Thế giới len thủ công</p>
      <h1 id="home-title" className={styles.title}>
        Đồ len nhỏ.
        <br />
        Thương thật nhiều.
      </h1>
      <p className={styles.description}>
        Những món đồ được làm chậm, để thương thật lâu. Tìm món len bạn yêu và
        gặp người nghệ nhân làm nên nó.
      </p>
      <div className={styles.actions}>
        <a href="#san-pham" className={styles.button}>
          Khám phá bộ sưu tập <span aria-hidden="true">↗</span>
        </a>
        <LocalizedClientLink href="/nghe-nhan" className={styles.secondary}>
          Gặp người làm len <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
      </div>
    </div>
    <a
      className={styles.credit}
      href="https://www.pexels.com/video/a-person-using-a-crochet-hook-while-knitting-10474543/"
      target="_blank"
      rel="noreferrer"
    >
      RDNE Stock project / Pexels
    </a>
  </section>
)

export default Hero
