"use client"

import { useEffect, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import styles from "@modules/landing/templates/yarnly-landing/landing-shell.module.css"

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.headerInner}>
        <LocalizedClientLink
          href="/ve-yarnly"
          className={styles.brand}
          aria-label="Yarnly — landing page"
        >
          Yarnly
        </LocalizedClientLink>
        <nav className={styles.desktopNav} aria-label="Điều hướng Yarnly">
          <div className={styles.navGroup}>
            <span>Cùng Yarnly</span>
            <a href="#kham-pha">Khám phá</a>
            <a href="#lam-rieng">Đặt riêng</a>
            <a href="#nghe-nhan">Nghệ nhân</a>
          </div>
          <a href="#bat-dau" className={styles.navGlass}>
            Bắt đầu
          </a>
          <LocalizedClientLink href="/account" className={styles.navGlass}>
            Tài khoản
          </LocalizedClientLink>
        </nav>
        <LocalizedClientLink href="/" className={styles.headerCta}>
          Vào Yarnly <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
        <details className={styles.mobileMenu}>
          <summary aria-label="Mở menu">
            <span />
            <span />
          </summary>
          <nav aria-label="Điều hướng trên điện thoại">
            <a href="#kham-pha">Khám phá</a>
            <a href="#lam-rieng">Đặt làm riêng</a>
            <a href="#nghe-nhan">Dành cho nghệ nhân</a>
            <LocalizedClientLink href="/account">Tài khoản</LocalizedClientLink>
          </nav>
        </details>
      </div>
    </header>
  )
}
