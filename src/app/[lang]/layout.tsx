import { notFound } from 'next/navigation'
import { locales } from '@/lib/i18n'
import { hasLocale, getDictionary } from './dictionaries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout(
  props: LayoutProps<'/[lang]'>
) {
  const { lang } = await props.params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header lang={lang} />
        <main className="flex-1">{props.children}</main>
        <Footer lang={lang} dictionary={dict} />
      </body>
    </html>
  )
}
