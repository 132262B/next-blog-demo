import Link from 'next/link'
import { type Post, getExcerpt } from '@/lib/posts'

interface BlogCardProps {
  post: Post
  lang: string
  dictionary: any
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogCard({ post, lang, dictionary }: BlogCardProps) {
  const { title, slug, author, date, category } = post.frontmatter
  const excerpt = getExcerpt(post.content)

  return (
    <article className="mb-10">
      <Link href={`/${lang}/${slug}`} className="block">
        <img
          src={`/${lang}/${slug}/opengraph-image`}
          alt={title}
          className="w-full aspect-video object-cover mb-4"
        />
      </Link>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        <Link href={`/${lang}/${slug}`} className="no-underline hover:underline text-gray-700">
          {title}
        </Link>
      </h2>

      <div className="flex flex-wrap items-center gap-1 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          {author}
        </span>
        <span className="mx-1">-</span>

        <span className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          {formatDate(date)}
        </span>
        <span className="mx-1">-</span>

        <span className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6Z"
            />
          </svg>
          {category}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-3">
        {excerpt}
      </p>

      <Link
        href={`/${lang}/${slug}`}
        className="text-xs font-normal text-gray-700 hover:underline inline-flex items-center gap-1"
      >
        {dictionary.blog.continueReading} <span aria-hidden="true">&rarr;</span>
      </Link>
    </article>
  )
}
