import type { MetadataRoute } from 'next'
import { site } from '@/data/site'

export default function robots(): MetadataRoute.Robots {
  // R-G3: bản demo chặn toàn bộ
  if (site.isDemo) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
