interface FooterProps {
  lang: string
  dictionary: any
}

export default function Footer({ lang, dictionary }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {year} DANDAN10. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
