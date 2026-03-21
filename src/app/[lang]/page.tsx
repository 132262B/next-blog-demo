import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, SITE_URL } from '@/lib/i18n'
import { hasLocale, getDictionary } from './dictionaries'
import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params

  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}`
  }

  return {
    title: 'DANDAN10 | Top 10 on Everything Finance',
    description: 'Your go-to source for top 10 lists on everything finance.',
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages,
    },
  }
}

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const posts = getAllPosts(lang)

  return (
    <>
      <section className="bg-gray-50 border-b border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-700">
            {dict.home.tagline}
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0 space-y-12">
            {posts.map((post) => (
              <BlogCard
                key={post.frontmatter.slug}
                post={post}
                lang={lang}
                dictionary={dict}
              />
            ))}
          </div>
          <aside className="hidden md:block w-72 shrink-0" />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'DANDAN10',
            url: `${SITE_URL}/${lang}`,
          }),
        }}
      />
    </>
  )
}
