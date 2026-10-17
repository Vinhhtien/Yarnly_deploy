"use client"

import { useEffect } from "react"

/** Slow, cancellable anchor navigation shared by the homepage and landing. */
export default function SmoothSectionNavigation() {
  useEffect(() => {
    let frame = 0
    const cancel = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
          "Escape",
        ].includes(event.key)
      )
        cancel()
    }
    const navigate = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]")
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return
      cancel()
      const url = new URL(anchor.href, window.location.href)
      if (
        !url.hash ||
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      )
        return
      let targetId: string
      try {
        targetId = decodeURIComponent(url.hash.slice(1))
      } catch {
        return
      }
      const target = document.getElementById(targetId)
      if (!target) return

      event.preventDefault()
      cancel()
      const start = window.scrollY
      anchor.blur()
      anchor.closest("details[open]")?.removeAttribute("open")
      if (url.hash !== window.location.hash)
        window.history.pushState(null, "", url.hash)
      frame = window.requestAnimationFrame(() => {
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
        const end = Math.max(
          0,
          Math.min(
            target.getBoundingClientRect().top + window.scrollY - margin,
            document.documentElement.scrollHeight - window.innerHeight
          )
        )
        const distance = end - start
        const focusTarget = () => {
          const hadTabIndex = target.hasAttribute("tabindex")
          if (!hadTabIndex) target.setAttribute("tabindex", "-1")
          target.focus({ preventScroll: true })
          if (!hadTabIndex)
            target.addEventListener(
              "blur",
              () => target.removeAttribute("tabindex"),
              { once: true }
            )
        }
        if (
          Math.abs(distance) < 1 ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          window.scrollTo({ top: end, behavior: "instant" })
          frame = 0
          focusTarget()
          return
        }
        const duration = Math.min(1700, 1100 + Math.abs(distance) * 0.08)
        const started = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - started) / duration, 1)
          const eased =
            progress < 0.5
              ? 4 * progress ** 3
              : 1 - (-2 * progress + 2) ** 3 / 2
          window.scrollTo({
            top: start + distance * eased,
            behavior: "instant",
          })
          if (progress < 1) frame = window.requestAnimationFrame(step)
          else {
            frame = 0
            focusTarget()
          }
        }
        frame = window.requestAnimationFrame(step)
      })
    }

    document.addEventListener("click", navigate, true)
    window.addEventListener("pointerdown", cancel, { passive: true })
    window.addEventListener("wheel", cancel, { passive: true })
    window.addEventListener("touchstart", cancel, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("popstate", cancel)
    return () => {
      cancel()
      document.removeEventListener("click", navigate, true)
      window.removeEventListener("pointerdown", cancel)
      window.removeEventListener("wheel", cancel)
      window.removeEventListener("touchstart", cancel)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("popstate", cancel)
    }
  }, [])

  return null
}
