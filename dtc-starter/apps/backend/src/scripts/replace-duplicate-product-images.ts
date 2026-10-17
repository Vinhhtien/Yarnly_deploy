import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import type { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  MedusaError,
  Modules,
} from "@medusajs/framework/utils"

const replacements = [
  {
    id: "prod_01M3CZ1F5CHN9T51TE7FZX96SZ",
    handle: "crochet-v3-8-thu-bong-amigurumi",
    previousFile: "Gau_bong_len-01M3PHEJT2RQ8F0D175JMW3C85.jpg",
    image: "https://yarnly-rust.vercel.app/images/product-amigurumi-bunny.webp",
  },
  {
    id: "prod_01M3H25A8DTKKAY78NC0CE9ZRJ",
    handle: "thu-bong-len-mujlnqra",
    previousFile: "1790500309641-6-2-01M3PHEQB9G83QY83KPQHM4WKH.webp",
    image:
      "https://yarnly-rust.vercel.app/images/product-crochet-bunny-pink.webp",
  },
]

/** Defaults to a read-only plan. Set APPLY_PRODUCT_IMAGES=true to apply it. */
export default async function replaceDuplicateProductImages({
  container,
}: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const search = container.resolve(Modules.SEARCH)
  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "title", "thumbnail", "images.url"],
    filters: { id: replacements.map((replacement) => replacement.id) },
  })

  const updates = replacements.map((replacement) => {
    const product = products.find((item) => item.id === replacement.id)
    if (!product || product.handle !== replacement.handle) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Expected product not found: ${replacement.handle}`
      )
    }
    if (
      product.thumbnail !== replacement.image &&
      !product.thumbnail?.endsWith(replacement.previousFile)
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Photo was changed since the plan: ${replacement.handle}`
      )
    }
    if (
      product.images?.length !== 1 ||
      product.images[0].url !== product.thumbnail
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Gallery was changed since the plan: ${replacement.handle}`
      )
    }
    logger.info(
      `${product.handle}: ${product.thumbnail} -> ${replacement.image}`
    )
    return {
      id: product.id,
      thumbnail: replacement.image,
      images: [{ url: replacement.image }],
    }
  })

  if (process.env.APPLY_PRODUCT_IMAGES !== "true") {
    logger.info("Read-only plan complete. No product data changed.")
    return
  }

  for (const replacement of replacements) {
    const response = await fetch(replacement.image, { method: "HEAD" })
    if (
      !response.ok ||
      !response.headers.get("content-type")?.startsWith("image/")
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Deploy the replacement image first: ${replacement.image}`
      )
    }
  }

  await updateProductsWorkflow(container).run({ input: { products: updates } })
  await search.reindex()
  logger.info(
    "Updated the two requested photos and refreshed the product search index."
  )
}
