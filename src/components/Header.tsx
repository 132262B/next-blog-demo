import Link from 'next/link'

interface HeaderProps {
  lang: string
}

export default function Header({ lang }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <Link
          href={`/${lang}/`}
          className="text-2xl font-normal tracking-normal text-gray-700 no-underline"
        >
          DANDAN10
        </Link>
      </div>
    </header>
  )
}
