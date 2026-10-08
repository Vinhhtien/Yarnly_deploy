import { redirect } from "next/navigation"

/** Old address of the custom requests list, still linked from emails. */
export default async function ArtisanCustomRequestsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  redirect(`/${countryCode}/kenh-nghe-nhan/don-lam-rieng`)
}
