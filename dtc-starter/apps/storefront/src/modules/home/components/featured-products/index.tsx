import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  const hiddenHomepageCollections = new Set([
    "quà-tặng-ý-nghĩa",
    "phụ-kiện-xinh",
  ])

  return collections
    .filter(
      (collection) =>
        !hiddenHomepageCollections.has(collection.handle.normalize("NFC"))
    )
    .map((collection) => (
      <li key={collection.id}>
        <ProductRail collection={collection} region={region} />
      </li>
    ))
}
