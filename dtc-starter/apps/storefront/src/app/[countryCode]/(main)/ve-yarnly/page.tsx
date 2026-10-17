import type { Metadata } from "next"

import YarnlyLanding from "@modules/landing/templates/yarnly-landing"

export const metadata: Metadata = {
  title: "Về Yarnly — Nơi những đôi tay khéo léo được tìm thấy",
  description:
    "Khám phá cách Yarnly kết nối người yêu đồ len handmade với những nghệ nhân Việt Nam.",
}

export default function YarnlyAboutPage() {
  return <YarnlyLanding />
}
