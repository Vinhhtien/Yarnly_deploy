import { redirect } from "next/navigation"

export default async function LegacyLandingPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  redirect(`/${countryCode}`)
}
