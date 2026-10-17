# Yarnly homepage media

Prepared on 2026-10-17 for the homepage redesign. These are editorial images of yarn and crochet work; they do not represent specific Yarnly sellers or products available for purchase.

The homepage now uses the RDNE crochet film as a full-screen autoplaying, muted, looping hero with text overlaid. Its header is transparent over the film and changes to the landing page's paper palette on scroll. The previous generated still life is retained as an unused design asset.

## Stock media

All three files below come from Pexels. The [Pexels license](https://www.pexels.com/license/) permits free use and modification on websites and e-commerce shops. Attribution is optional; original creator credits are retained here.

| Local public path | Original source and creator | File metadata |
| --- | --- | --- |
| `/images/yarnly-studio-yarn.webp` | [Yarn Rolls on a Wooden Tay](https://www.pexels.com/photo/yarn-rolls-on-a-wooden-tay-5709862/) by Arina Krasnikova | WebP, 1600 × 1068, 179,498 bytes |
| `/images/yarnly-crochet-film-poster.webp` | Poster for [A Person Using a Crochet Hook while Knitting](https://www.pexels.com/video/a-person-using-a-crochet-hook-while-knitting-10474543/) by RDNE Stock project | WebP, 1920 × 1080, 96,232 bytes |
| `/videos/yarnly-crochet-workshop.mp4` | [A Person Using a Crochet Hook while Knitting](https://www.pexels.com/video/a-person-using-a-crochet-hook-while-knitting-10474543/) by RDNE Stock project | MP4, 1920 × 1080, 30 fps, approximately 11.17 seconds, 7,042,041 bytes, no audio track |

The photograph shows three neutral wool skeins on a wooden tray. The film and poster show hands working cream yarn with a single crochet hook. Both images were visually inspected after conversion.

## Source asset URLs

- Yarn photograph: `https://images.pexels.com/photos/5709862/pexels-photo-5709862.jpeg?auto=compress&fit=crop&w=1600&q=85`
- Film poster: `https://images.pexels.com/videos/10474543/artist-craft-handmade-hobby-10474543.jpeg`
- Film: `https://videos.pexels.com/video-files/10474543/10474543-hd_1920_1080_30fps.mp4`

The film URL was confirmed through the original Pexels download endpoint. All source assets returned HTTP 200 when retrieved.

## Processing and verification

The two photographs were converted to WebP with the workspace's existing Sharp 0.34.5 dependency, quality 84 and effort 6. Dimensions were preserved from the retrieved source files; no generated content was added.

No FFmpeg executable was installed, so the original MP4 encoding was retained. Its `moov` metadata box precedes `mdat`, allowing progressive playback. The local MP4 metadata was inspected to confirm the 1920 × 1080 video track, approximately 11.17-second duration, and absence of an audio track.

Files are stored under `apps/storefront/public/` so the site can serve its own media without relying on third-party playback URLs.

## Generated hero still life

- Tool: built-in imagegen.
- Asset: `apps/storefront/public/images/yarnly-handmade-edit.webp`.
- Original: 1672 × 941 PNG; WebP copy preserves dimensions at quality 88.
- Usage: inspirational craft editorial, not a product listing.
- Template direction: [Hand Made](https://handmade-ecommerce.webflow.io/), recreated with original code, Vietnamese copy and Yarnly media. No paid template source or images reused.

Final prompt:

Use case: ads-marketing. Asset type: wide editorial hero photograph for a Vietnamese handmade crochet marketplace called Yarnly. Primary request: a beautifully art-directed still life of real handcrafted crochet pieces laid out on a warm apricot linen work table: a small cream crochet bunny with long ears, three hand-crocheted tulips in dusty coral and sage green, a soft sage and ecru granny-square shoulder bag, small terracotta and ivory yarn balls, two wooden crochet hooks and a little thread. No packaging. Composition/framing: horizontal wide photograph 16:9, overhead to slightly oblique camera, pieces arranged with elegant breathing room across the whole frame, the bunny on the right, the bag left, flowers gently diagonally through the middle. This is a full image panel with no text overlay, so focus on a coherent magazine-quality composition rather than empty text space. Style: high-end independent craft journal photography, tactile hand-looped stitches clearly visible, natural irregularity of handmade crochet, subtle film grain, soft daylight with a gentle window shadow from upper left. Palette: warm peach background, natural ivory, muted sage, tiny coral accents. Materials: visible cotton yarn twist and linen weave, wooden hooks. Constraints: photorealistic physical craft objects, no illustration, no 3D render appearance, no people, no letters, no logos, no watermark, no text, no embedded website interface.
