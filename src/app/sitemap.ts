import type { MetadataRoute } from 'next'
import { locales, SITE_URL } from '@/lib/i18n'
import { getPostSlugs } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getPostSlugs()
  const entries: MetadataRoute.Sitemap = []

  // Homepage entries for each locale
  for (const locale of locales) {
    const languages: Record<string, string> = {}
    for (const l of locales) {
      languages[l] = `${SITE_URL}/${l}`
    }
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      alternates: { languages },
    })
  }

  // Post entries for each locale × slug
  for (const slug of slugs) {
    for (const locale of locales) {
      const languages: Record<string, string> = {}
      for (const l of locales) {
        languages[l] = `${SITE_URL}/${l}/${slug}`
      }
      entries.push({
        url: `${SITE_URL}/${locale}/${slug}`,
        lastModified: new Date(),
        alternates: { languages },
      })
    }
  }

  return entries
}
