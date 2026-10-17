"use client"

import Image from "next/image"
import { useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PixelIcon from "./pixel-icon"
import styles from "./feature-sections.module.css"

type FeatureKind = "catalog" | "custom" | "studio"
type FeatureTab = { title: string; description: string; image: string }

const sections: {
  id: string
  label: string
  title: string
  body: string
  kind: FeatureKind
  action: string
  href: string
  tabs: FeatureTab[]
}[] = [
  {
    id: "kham-pha",
    label: "1.0 — KHÁM PHÁ",
    title: "Tìm thấy món len bạn muốn giữ bên mình.",
    body: "Từ một người bạn bằng len đến món phụ kiện nhỏ. Dạo qua các gian hàng và tìm thiết kế khiến bạn muốn dừng lại lâu hơn.",
    kind: "catalog",
    action: "Khám phá sản phẩm",
    href: "/store",
    tabs: [
      {
        title: "Thú bông len",
        description:
          "Những người bạn nhỏ được móc bằng tay, mỗi món mang một vẻ đáng yêu riêng.",
        image: "/images/crochet_bear.png",
      },
      {
        title: "Hoa và quà tặng",
        description:
          "Một bông hoa không vội tàn, một món quà gửi thay điều bạn muốn nói.",
        image: "/images/cuu_hoa_len.jpg",
      },
      {
        title: "Phụ kiện thường ngày",
        description:
          "Móc khóa, túi, mũ và những chi tiết thủ công làm ngày thường thêm thú vị.",
        image: "/images/moc_khoa.jpg",
      },
    ],
  },
  {
    id: "lam-rieng",
    label: "2.0 — ĐẶT LÀM RIÊNG",
    title: "Một ý tưởng của bạn. Một món quà thật riêng.",
    body: "Bạn đã hình dung món đồ mình muốn? Gửi yêu cầu và cùng nghệ nhân trao đổi để tìm ra màu sắc, kích thước và chi tiết phù hợp.",
    kind: "custom",
    action: "Gửi yêu cầu của bạn",
    href: "/account/yeu-cau-lam-rieng",
    tabs: [
      {
        title: "Chọn sắc màu",
        description:
          "Bắt đầu với màu bạn yêu hoặc bảng màu của người bạn muốn gửi tặng.",
        image: "/images/moc_khoa.jpg",
      },
      {
        title: "Chia sẻ ý tưởng",
        description:
          "Mô tả hình dáng, kích thước và những chi tiết khiến món đồ trở nên đặc biệt.",
        image: "/images/cuu_hoa_len.jpg",
      },
      {
        title: "Trao đổi với nghệ nhân",
        description:
          "Cùng làm rõ yêu cầu trước khi người nghệ nhân bắt tay vào từng mũi móc.",
        image: "/images/crochet_bear.png",
      },
    ],
  },
  {
    id: "nghe-nhan",
    label: "3.0 — DÀNH CHO NGHỆ NHÂN",
    title: "Bạn làm nên điều đặc biệt. Yarnly giúp người khác tìm thấy.",
    body: "Mang sản phẩm, phong cách và câu chuyện của bạn đến một gian hàng riêng. Kết nối với những người trân trọng đồ thủ công.",
    kind: "studio",
    action: "Mở gian hàng Yarnly",
    href: "/kenh-nghe-nhan/dang-ky",
    tabs: [
      {
        title: "Giới thiệu sản phẩm",
        description:
          "Tạo không gian cho bộ sưu tập thủ công và những thiết kế mang dấu ấn của bạn.",
        image: "/images/tui_xach.jpg",
      },
      {
        title: "Nhận yêu cầu làm riêng",
        description:
          "Tìm hiểu ý tưởng của khách hàng và trao đổi về những món đồ có thể cùng tạo nên.",
        image: "/images/moc_khoa.jpg",
      },
      {
        title: "Theo dõi đơn hàng",
        description:
          "Quản lý sản phẩm, yêu cầu và đơn hàng trong kênh dành cho nghệ nhân.",
        image: "/images/cardigan.jpg",
      },
    ],
  },
]

function FeatureRow({
  section,
  index,
}: {
  section: (typeof sections)[number]
  index: number
}) {
  const [active, setActive] = useState(0)
  const selected = section.tabs[active]

  return (
    <section
      id={section.id}
      className={
        styles.featureRow + (index % 2 ? " " + styles.featureReverse : "")
      }
    >
      <div className={styles.featureCopy}>
        <p className={styles.eyebrow}>{section.label}</p>
        <h3>{section.title}</h3>
        <p>{section.body}</p>
        <div className={styles.accordionList}>
          {section.tabs.map((tab, tabIndex) => (
            <div key={tab.title} className={styles.accordionItem}>
              <button
                type="button"
                onClick={() => setActive(tabIndex)}
                aria-expanded={active === tabIndex}
                aria-controls={section.id + "-" + tabIndex}
              >
                <span className={styles.stepNumber}>
                  {index + 1}.{tabIndex + 1}
                </span>
                <span>{tab.title}</span>
                <span className={styles.plus} aria-hidden="true">
                  {active === tabIndex ? "−" : "+"}
                </span>
              </button>
              <div
                id={section.id + "-" + tabIndex}
                hidden={active !== tabIndex}
                className={styles.accordionDescription}
              >
                {tab.description}
              </div>
            </div>
          ))}
        </div>
        <LocalizedClientLink href={section.href} className={styles.textLink}>
          {section.action} <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
      </div>

      <div className={styles.featureVisual} aria-label={selected.title}>
        <div className={styles.previewBar}>
          <span className={styles.previewDots}>
            <i />
            <i />
            <i />
          </span>
          <span>
            {section.kind === "studio"
              ? "Gian hàng của bạn · minh họa"
              : section.kind === "custom"
              ? "Ý tưởng làm riêng · minh họa"
              : "Một góc bộ sưu tập"}
          </span>
          <PixelIcon kind="yarn" />
        </div>
        {section.kind === "catalog" && (
          <div className={styles.catalogPreview}>
            <div className={styles.catalogMain}>
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(max-width: 760px) 85vw, 40vw"
              />
            </div>
            <div className={styles.catalogSidebar}>
              <p>ĐỒ LEN THỦ CÔNG</p>
              <h4>{selected.title}</h4>
              <span>
                Một chút mềm mại
                <br />
                cho ngày của bạn.
              </span>
              <div className={styles.previewThumbs}>
                {section.tabs
                  .filter((_, i) => i !== active)
                  .map((tab) => (
                    <div key={tab.title}>
                      <Image src={tab.image} alt="" fill sizes="100px" />
                    </div>
                  ))}
              </div>
              <span className={styles.previewTag}>Làm bằng tay · Việt Nam</span>
            </div>
          </div>
        )}
        {section.kind === "custom" && (
          <div className={styles.customPreview}>
            <div className={styles.customImage}>
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(max-width: 760px) 45vw, 24vw"
              />
            </div>
            <div className={styles.requestCard}>
              <PixelIcon kind="gift" />
              <p className={styles.eyebrow}>MỘT MÓN QUÀ CỦA RIÊNG BẠN</p>
              <h4>{selected.title}</h4>
              <p>Điều gì làm món đồ ấy trở nên đặc biệt?</p>
              <div className={styles.colorSwatches} aria-label="Gợi ý màu len">
                <span style={{ background: "#e4d8bf" }} />
                <span style={{ background: "#a6b591" }} />
                <span style={{ background: "#d39e8d" }} />
                <span style={{ background: "#8faabb" }} />
              </div>
              <div className={styles.notePaper}>
                Mình muốn một món quà nhỏ,
                <br />
                với màu sắc người ấy thích…<span>Ví dụ ý tưởng làm riêng</span>
              </div>
              <div className={styles.requestStatus}>
                <i /> Cùng nghệ nhân trao đổi
              </div>
            </div>
          </div>
        )}
        {section.kind === "studio" && (
          <div className={styles.studioPreview}>
            <div className={styles.studioTitle}>
              <span className={styles.miniBrand}>Gian hàng của bạn</span>
              <span>Sản phẩm · Yêu cầu · Đơn hàng</span>
            </div>
            <div className={styles.studioBoard}>
              {[
                "Sản phẩm thủ công",
                "Ý tưởng làm riêng",
                "Kết nối khách hàng",
              ].map((label, i) => (
                <div
                  key={label}
                  className={
                    active === i ? styles.studioColumnActive : undefined
                  }
                >
                  <p>{label}</p>
                  <div className={styles.studioCard}>
                    <div>
                      <Image
                        src={section.tabs[i].image}
                        alt={section.tabs[i].title}
                        fill
                        sizes="(max-width: 760px) 25vw, 15vw"
                      />
                    </div>
                    <span>{section.tabs[i].title}</span>
                    <span className={styles.studioCardNote}>
                      Một câu chuyện bằng len
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.studioFoot}>
              <PixelIcon kind="heart" />
              <span>Bắt đầu từ những món đồ bạn tự tay làm nên.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default function FeatureSections() {
  return (
    <div className={styles.featureSections}>
      {sections.map((section, index) => (
        <FeatureRow key={section.id} section={section} index={index} />
      ))}
    </div>
  )
}
