import Link from 'next/link'
import { type Post } from '@/lib/posts'

interface RelatedPostsProps {
  posts: Post[]
  lang: string
  title: string
}

export default function RelatedPosts({ posts, lang, title }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-black mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.frontmatter.slug}>
            <Link href={`/${lang}/${post.frontmatter.slug}`} className="block">
              <img
                src={`/${lang}/${post.frontmatter.slug}/opengraph-image`}
                alt={post.frontmatter.title}
                className="w-full aspect-video object-cover mb-3"
              />
            </Link>
            <h3 className="text-sm font-bold text-black mb-1">
              <Link
                href={`/${lang}/${post.frontmatter.slug}`}
                className="no-underline hover:underline text-black"
              >
                {post.frontmatter.title}
              </Link>
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
