"use client"

import Image from "next/image"
import { useEffect, useId, useRef, useState } from "react"

import styles from "./pixel-landscape.module.css"

type PixelLandscapeProps = {
  variant?: "hero" | "footer"
}

const leaves = [
  { x: 1110, y: 240, delay: "-2s", duration: "17s" },
  { x: 1390, y: 320, delay: "-9s", duration: "21s" },
  { x: 920, y: 370, delay: "-5s", duration: "19s" },
  { x: 1510, y: 180, delay: "-13s", duration: "23s" },
  { x: 1240, y: 410, delay: "-16s", duration: "20s" },
]

function PixelCloud({
  x,
  y,
  scale = 1,
}: {
  x: number
  y: number
  scale?: number
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0 30h12V18h18V6h24V0h30v12h18v12h24v12h18v12H0Z"
        fill="#fffef2"
      />
      <path d="M0 36h24v6h30v-6h24v6h36v-6h30v12H0Z" fill="#d3e8ef" />
      <path d="M30 18h12V6h12v12h-6v12H30Z" fill="#ffffff" />
    </g>
  )
}

/** Decorative motion shares the artwork's coordinate system at every crop. */
export default function PixelLandscape({
  variant = "hero",
}: PixelLandscapeProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, "")
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const isFooter = variant === "footer"

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "80px" }
    )
    observer.observe(scene)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={sceneRef}
        className={`${styles.scene} ${isFooter ? styles.footer : ""}`}
        data-running={isVisible && !isPaused}
        data-testid={`pixel-landscape-${variant}`}
        aria-hidden="true"
      >
        <div className={styles.world}>
          <Image
            className={styles.artwork}
            src="/images/yarnly-pixel-garden.webp"
            alt=""
            fill
            priority={!isFooter}
            sizes="(max-width: 800px) 1510px, 100vw"
          />
          <svg
            className={styles.effects}
            viewBox="0 0 1672 941"
            fill="none"
            shapeRendering="crispEdges"
            focusable="false"
          >
            <defs>
              <clipPath id={`${id}-sky`}>
                <path d="M0 0H650L658 85 740 120 785 202 890 250 934 330 1060 360 1120 411 1160 445 1020 500 800 572H0Z" />
              </clipPath>
              <clipPath id={`${id}-lake`}>
                <path d="M0 703 69 702 129 713 271 719 407 707 463 690 815 688 759 718 626 747 465 764 290 763 98 779 0 762Z" />
              </clipPath>
              <clipPath id={`${id}-canopy`}>
                <path d="M680 0H1672V384L1590 399 1514 343 1448 401 1353 321 1304 350 1222 303 1140 338 1090 294 1010 330 923 320 880 248 788 217 808 160 729 121 660 74Z" />
              </clipPath>
            </defs>

            <g clipPath={`url(#${id}-sky)`} className={styles.clouds}>
              <g className={styles.cloudOne}>
                <PixelCloud x={50} y={165} scale={1.25} />
                <PixelCloud x={-1000} y={165} scale={1.25} />
              </g>
              <g className={styles.cloudTwo}>
                <PixelCloud x={440} y={280} scale={0.68} />
                <PixelCloud x={-610} y={280} scale={0.68} />
              </g>
              <g className={styles.cloudThree}>
                <PixelCloud x={670} y={370} scale={0.47} />
                <PixelCloud x={-380} y={370} scale={0.47} />
              </g>
            </g>

            <g clipPath={`url(#${id}-canopy)`} className={styles.canopyLight}>
              <path
                d="M720 30h72v20h-36v34h-28V68h-18Zm170 94h38v20h28v30h-60v-18h-26Zm157-99h58v28h-24v28h-36v-18h-18Zm101 157h56v22h32v20h-78v-18h-26Zm155-119h38v24h36v26h-52V95h-42Zm122 148h40v22h38v24h-56v-18h-40Zm-391 39h48v24h26v20h-64v-16h-26Zm-194-9h46v24h-28v18h-36v-22h18Z"
                fill="#f4ed96"
              />
            </g>

            <g clipPath={`url(#${id}-lake)`}>
              <g className={styles.rippleOne} stroke="#e5f9ed" strokeWidth="2">
                <path d="M135 729h30m75 12h44m76-9h27m57 16h39m67-40h30m58 11h40" />
                <path d="M54 756h20m214 1h28m191-21h22m97-40h29" />
              </g>
              <g className={styles.rippleTwo} stroke="#d3fbfc" strokeWidth="3">
                <path d="M93 736h21m82 17h43m76-34h25m78 12h33m106-12h35m61-15h28" />
                <path d="M360 753h32m-238 12h27m392-34h29m101-25h35" />
              </g>
            </g>

            {leaves.map((leaf) => (
              <g key={leaf.x} transform={`translate(${leaf.x} ${leaf.y})`}>
                <g
                  className={styles.fallingLeaf}
                  style={{
                    animationDelay: leaf.delay,
                    animationDuration: leaf.duration,
                  }}
                >
                  <path d="M0 0h7v-4h8v8h-4v7H3V7h-7V3h4Z" fill="#bad35a" />
                  <path d="M0 4h7v3H0Z" fill="#6f9746" />
                </g>
              </g>
            ))}

            <g className={styles.butterfly}>
              <g className={styles.wings}>
                <path
                  d="M683 770h-7v-7h-8v11h5v7h10Zm3 0h7v-7h8v11h-5v7h-10Z"
                  fill="#f9df9d"
                />
                <path d="M680 781h-7v6h7Zm8 0h7v6h-7Z" fill="#edab6c" />
              </g>
              <path d="M683 770h3v15h-3Z" fill="#496641" />
            </g>
          </svg>
        </div>
      </div>
      <button
        type="button"
        className={`${styles.motionControl} ${
          isFooter ? styles.footerControl : ""
        }`}
        onClick={() => setIsPaused((paused) => !paused)}
        aria-label={
          isPaused
            ? "Phát chuyển động khu vườn"
            : "Tạm dừng chuyển động khu vườn"
        }
        aria-pressed={isPaused}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          {isPaused ? (
            <path d="m5 3 8 5-8 5Z" />
          ) : (
            <path d="M4 3h3v10H4Zm5 0h3v10H9Z" />
          )}
        </svg>
        <span>{isPaused ? "Phát cảnh" : "Tạm dừng cảnh"}</span>
      </button>
    </>
  )
}
