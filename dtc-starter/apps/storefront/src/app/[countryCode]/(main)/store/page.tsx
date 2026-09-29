import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import StoreTemplate from "@modules/store/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { parseOptionValueIds } from "@lib/util/product-option-filters"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<
    Record<string, string | string[] | undefined> & {
      page?: string
      sortBy?: SortOptions
      optionValueIds?: string | string[]
    }
  >
}

export default async function StorePage(props: Props) {
  const { countryCode } = await props.params
  const searchParams = await props.searchParams
  const region = await getRegion(countryCode)
  const { sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  if (!region) {
    notFound()
  }

  return (
    <StoreTemplate
      countryCode={countryCode}
      sortBy={sortBy}
      page={page}
      optionValueIds={optionValueIds}
    />
  )
}
