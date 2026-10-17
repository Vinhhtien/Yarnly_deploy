"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import styles from "./nav-surface.module.css"

export default function NavSurface({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHome = /^\/[a-z]{2}(?:-[a-z]{2})?\/?$/i.test(pathname)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [pathname])

  return (
    <div
      className={styles.surface}
      data-overlay={isHome}
      data-scrolled={scrolled}
      data-testid="storefront-header"
    >
      <header className={styles.header}>{children}</header>
    </div>
  )
}
