import Link from 'next/link'

interface HeaderProps {
  lang: string
}

export default function Header({ lang }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-5">
        <Link
          href={`/${lang}/`}
          className="text-xl font-bold tracking-widest text-black no-underline"
        >
          DANDAN10
        </Link>
      </div>
    </header>
  )
}
