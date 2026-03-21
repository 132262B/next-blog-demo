import { type Heading } from '@/lib/posts'

interface TableOfContentsProps {
  headings: Heading[]
  title: string
}

export default function TableOfContents({ headings, title }: TableOfContentsProps) {
  if (headings.length === 0) return null

  return (
    <nav className="border border-gray-400 rounded-sm p-5 mb-8">
      <h2 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">
        {title}
      </h2>
      <ol className="space-y-1.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'pl-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              className="text-gray-600 hover:text-black hover:underline leading-relaxed block"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
