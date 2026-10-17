import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import styles from "./footer.module.css"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "id,handle,title",
  })

  return (
    <footer className={styles.footer} aria-label="Chân trang Yarnly">
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <LocalizedClientLink href="/" className={styles.wordmark}>
              Yarnly<span aria-hidden="true">.</span>
            </LocalizedClientLink>
            <p>
              Nơi những mũi len nhỏ
              <br />
              kết nối những câu chuyện lớn.
            </p>
            <span className={styles.brandNote}>Đồ len thủ công Việt Nam</span>
          </div>

          <nav aria-labelledby="footer-explore-title">
            <h2 id="footer-explore-title" className={styles.heading}>
              Khám phá
            </h2>
            <ul className={styles.links}>
              <li>
                <LocalizedClientLink href="/store">
                  Tất cả sản phẩm
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/nghe-nhan">
                  Gặp gỡ nghệ nhân
                </LocalizedClientLink>
              </li>
              {collections?.slice(0, 4).map((collection) => (
                <li key={collection.id}>
                  <LocalizedClientLink
                    href={`/collections/${collection.handle}`}
                  >
                    {collection.title}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-yarnly-title">
            <h2 id="footer-yarnly-title" className={styles.heading}>
              Cùng Yarnly
            </h2>
            <ul className={styles.links}>
              <li>
                <LocalizedClientLink href="/">
                  Câu chuyện Yarnly
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/account">
                  Tài khoản của bạn
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/account/yeu-cau-lam-rieng">
                  Yêu cầu làm riêng
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/kenh-nghe-nhan/dang-ky">
                  Mở gian hàng
                </LocalizedClientLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Yarnly.</p>
          <p>Làm bằng đôi tay. Gửi bằng yêu thương.</p>
        </div>
      </div>
    </footer>
  )
}
