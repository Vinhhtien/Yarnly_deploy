import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import styles from "../home-editorial.module.css"

const makingSteps = [
  {
    number: "01 / KHÁM PHÁ",
    title: "Chọn một món mình thương",
    description:
      "Một người bạn bằng len, một bông hoa hay món phụ kiện nhỏ. Bắt đầu từ điều khiến bạn mỉm cười.",
  },
  {
    number: "02 / KẾT NỐI",
    title: "Gặp người làm nên món ấy",
    description:
      "Ghé gian hàng, tìm hiểu phong cách và câu chuyện của người nghệ nhân đứng sau từng mũi móc.",
  },
  {
    number: "03 / LÀM RIÊNG",
    title: "Thêm một chút của riêng bạn",
    description:
      "Chia sẻ màu sắc, kích thước và ý tưởng để cùng nghệ nhân tạo nên món quà mang dấu ấn riêng.",
  },
]

const HomeStory = () => (
  <>
    <section className={styles.story} aria-labelledby="home-story-title">
      <div className={styles.storyHeading}>
        <div>
          <p className={styles.eyebrow}>Phía sau một món đồ bằng len</p>
          <h2 id="home-story-title" className={styles.sectionTitle}>
            Có những điều đẹp,
            <br />
            vì được làm bằng tay.
          </h2>
        </div>
        <p>
          Là thời gian, sự kiên nhẫn và chút yêu nghề trong từng vòng len.
          Yarnly kết nối bạn với những người làm nên điều nhỏ bé ấy.
        </p>
      </div>
      <figure className={styles.film}>
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="metadata"
          poster="/images/yarnly-crochet-film-poster.webp"
          aria-label="Cận cảnh đôi tay đang dùng kim móc tạo từng mũi len"
        >
          <source src="/videos/yarnly-crochet-workshop.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ phát video.
        </video>
        <figcaption className={styles.filmCaption}>
          <span>Chậm một chút. Thương nhiều hơn.</span>
          <span>Từng mũi móc / Từng chút chăm chút</span>
        </figcaption>
      </figure>
      <p className={styles.credit}>
        Thước phim về nghề móc len:{" "}
        <a
          href="https://www.pexels.com/video/a-person-using-a-crochet-hook-while-knitting-10474543/"
          target="_blank"
          rel="noreferrer"
        >
          RDNE Stock project / Pexels
        </a>
      </p>
      <ol className={styles.steps}>
        {makingSteps.map((step) => (
          <li key={step.number} className={styles.step}>
            <span className={styles.stepNumber}>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>

    <section className={styles.custom} aria-labelledby="home-custom-title">
      <div className={styles.customImage}>
        <Image
          src="/images/yarnly-studio-yarn.webp"
          alt="Những cuộn len màu trung tính và kim đan trên khay gỗ trong góc làm thủ công"
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </div>
      <div className={styles.customCopy}>
        <p className={styles.eyebrow}>Bạn có một ý tưởng?</p>
        <h2 id="home-custom-title" className={styles.sectionTitle}>
          Màu bạn thích.
          <br />
          Món quà bạn muốn.
        </h2>
        <p>
          Một chiếc túi đúng sắc màu, thú bông cho người đặc biệt, hay món quà
          chưa tìm thấy ở đâu. Kể Yarnly nghe và cùng nghệ nhân biến ý tưởng
          thành những mũi len.
        </p>
        <LocalizedClientLink
          href="/account/yeu-cau-lam-rieng"
          className={styles.button}
        >
          Đặt làm theo ý bạn <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
      </div>
    </section>
    <section className={styles.maker} aria-labelledby="home-maker-title">
      <div>
        <p className={styles.eyebrow}>Dành cho người yêu nghề len</p>
        <h2 id="home-maker-title">Góc nhỏ cho những đôi tay tài hoa.</h2>
      </div>
      <LocalizedClientLink
        href="/kenh-nghe-nhan/dang-ky"
        className={styles.textLink}
      >
        Mở gian hàng Yarnly <span aria-hidden="true">↗</span>
      </LocalizedClientLink>
    </section>
  </>
)

export default HomeStory
