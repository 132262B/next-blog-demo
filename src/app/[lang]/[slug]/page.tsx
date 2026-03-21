import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, SITE_URL } from '@/lib/i18n'
import { hasLocale, getDictionary } from '../dictionaries'
import {
  getPostBySlug,
  getPostSlugs,
  getPostContent,
  getRelatedPosts,
} from '@/lib/posts'
import Breadcrumbs from '@/components/Breadcrumbs'
import PostMeta from '@/components/PostMeta'
import TableOfContents from '@/components/TableOfContents'
import ArticleBody from '@/components/ArticleBody'
import RelatedPosts from '@/components/RelatedPosts'

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await props.params
  const post = getPostBySlug(slug, lang)
  if (!post) return {}

  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}/${slug}`
  }

  return {
    title: `${post.frontmatter.title} | DANDAN10`,
    description: post.frontmatter.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${slug}`,
      languages,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
  }
}

export default async function ArticlePage(
  props: PageProps<'/[lang]/[slug]'>
) {
  const { lang, slug } = await props.params

  if (!hasLocale(lang)) notFound()

  const post = getPostBySlug(slug, lang)
  if (!post) notFound()

  const dict = await getDictionary(lang)
  const { contentHtml, headings } = await getPostContent(post.content)
  const relatedPosts = getRelatedPosts(slug, lang, 3)

  return (
    <>
      {/* Breadcrumbs + Page Title */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-lg font-normal text-gray-700">
              {dict.blog.breadcrumbBlog}
            </h1>
            <Breadcrumbs
              postTitle={post.frontmatter.title}
              lang={lang}
              dictionary={dict}
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <article className="flex-1 min-w-0">
            {/* Featured Thumbnail */}
            <img
              src={`/${lang}/${slug}/opengraph-image`}
              alt={post.frontmatter.title}
              className="w-full aspect-video object-cover mb-8"
            />

            {/* Post Title */}
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
              {post.frontmatter.title}
            </h2>

            {/* Post Meta */}
            <div className="mb-8">
              <PostMeta
                author={post.frontmatter.author}
                date={post.frontmatter.date}
                category={post.frontmatter.category}
                lang={lang}
              />
            </div>

            {/* Table of Contents */}
            {headings.length > 0 && (
              <TableOfContents
                headings={headings}
                title={dict.blog.tableOfContents}
              />
            )}

            {/* Article Body */}
            <ArticleBody contentHtml={contentHtml} />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="pt-12">
                <RelatedPosts
                  posts={relatedPosts}
                  lang={lang}
                  title={dict.blog.relatedPosts}
                />
              </section>
            )}
          </article>
          <aside className="hidden md:block w-72 shrink-0" />
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            datePublished: post.frontmatter.date,
            author: {
              '@type': 'Person',
              name: post.frontmatter.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'DANDAN10',
            },
            image: `${SITE_URL}/${lang}/${slug}/opengraph-image`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: dict.blog.breadcrumbHome,
                item: `${SITE_URL}/${lang}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: dict.blog.breadcrumbBlog,
                item: `${SITE_URL}/${lang}`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.frontmatter.title,
              },
            ],
          }),
        }}
      />
    </>
  )
}
