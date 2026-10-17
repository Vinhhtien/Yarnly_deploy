# Product photo replacements

Two genuine stock photographs replace the duplicate teddy photo on the demo catalogue. No AI generation or AI image editing was used. Sharp applies WebP encoding and a conventional crop around the completed bunny in the first photograph so the whole toy remains visible in portrait product cards. The pink photograph preserves its original composition.

| Product handle | Local asset | Photographer and original source |
| --- | --- | --- |
| `crochet-v3-8-thu-bong-amigurumi` | `apps/storefront/public/images/product-amigurumi-bunny.webp` | [itschansy — Crocheted Toys](https://www.pexels.com/photo/crocheted-toys-4102835/) |
| `thu-bong-len-mujlnqra` | `apps/storefront/public/images/product-crochet-bunny-pink.webp` | [Ngoc Tram Nguyen — Stuffed Bunny against a Pink Background](https://www.pexels.com/photo/stuffed-bunny-against-a-pink-background-17357483/) |

Both are available under the [Pexels license](https://www.pexels.com/license/). Pexels [does not allow generative-AI uploads](https://help.pexels.com/hc/en-us/articles/27453505326873-Can-I-upload-generative-AI-photos-and-videos-to-Pexels). The pink bunny was published on June 25, 2023. Original credits and links are retained here; stock images are catalogue demo imagery and do not identify a Yarnly seller.

The original photo is retained on `crochet-v3-1-gau-bong-len`. The two other product records are updated through `updateProductsWorkflow`, including both the thumbnail and gallery. The script `apps/backend/src/scripts/replace-duplicate-product-images.ts` defaults to a read-only plan; it checks the expected handles and old images, checks that the newly deployed asset URLs work, and only writes when `APPLY_PRODUCT_IMAGES=true`. It then reindexes product search so listing, details, cart and search use the same images.

Deploy the frontend assets before applying the script. The previous image filenames are recorded in the script for a reversible update.
