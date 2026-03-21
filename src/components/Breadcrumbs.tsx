import Link from 'next/link'

interface BreadcrumbsProps {
  postTitle: string
  lang: string
  dictionary: any
}

export default function Breadcrumbs({ postTitle, lang, dictionary }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
      <ol className="flex items-center gap-1 flex-wrap">
        <li>
          <Link href={`/${lang}/`} className="hover:underline text-gray-500">
            {dictionary.blog.breadcrumbHome}
          </Link>
        </li>
        <li aria-hidden="true" className="mx-1">&gt;</li>
        <li>
          <Link href={`/${lang}/`} className="hover:underline text-gray-500">
            {dictionary.blog.breadcrumbBlog}
          </Link>
        </li>
        <li aria-hidden="true" className="mx-1">&gt;</li>
        <li>
          <span className="text-gray-800" aria-current="page">
            {postTitle}
          </span>
        </li>
      </ol>
    </nav>
  )
}
