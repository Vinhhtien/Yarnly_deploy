import type { Metadata } from "next"

import YarnlyLanding from "@modules/landing/templates/yarnly-landing"

export const metadata: Metadata = {
  title: "Yarnly — Một thế giới len thủ công",
  description:
    "Khám phá đồ len handmade, gặp gỡ nghệ nhân Việt và đặt làm món quà của riêng bạn cùng Yarnly.",
}

export default function YarnlyLandingPage() {
  return <YarnlyLanding />
}
