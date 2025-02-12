import type { SitemapUrlInput } from '#sitemap/types'
import { useHalo } from "~/utils/halo"

export default defineSitemapEventHandler(async () => {
  const { coreApi } = useHalo()
  const res = await coreApi.content.post.listPost()
  const posts = res.data.items

  return posts.filter((p) => !p.spec.deleted).map((p) => ({
    loc: `/posts/${p.metadata.name}`,
    _sitemap: 'pages',
    lastmod: p.spec.publishTime,
  })) satisfies SitemapUrlInput[]
})
