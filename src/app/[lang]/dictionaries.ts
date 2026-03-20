import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ko: () => import('./dictionaries/ko.json').then((m) => m.default),
  ja: () => import('./dictionaries/ja.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
  de: () => import('./dictionaries/de.json').then((m) => m.default),
  it: () => import('./dictionaries/it.json').then((m) => m.default),
  pt: () => import('./dictionaries/pt.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
  hi: () => import('./dictionaries/hi.json').then((m) => m.default),
  th: () => import('./dictionaries/th.json').then((m) => m.default),
  vi: () => import('./dictionaries/vi.json').then((m) => m.default),
  id: () => import('./dictionaries/id.json').then((m) => m.default),
  tr: () => import('./dictionaries/tr.json').then((m) => m.default),
  pl: () => import('./dictionaries/pl.json').then((m) => m.default),
  nl: () => import('./dictionaries/nl.json').then((m) => m.default),
  sv: () => import('./dictionaries/sv.json').then((m) => m.default),
  da: () => import('./dictionaries/da.json').then((m) => m.default),
}

export type DictLocale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is DictLocale =>
  locale in dictionaries

export const getDictionary = async (locale: DictLocale) =>
  dictionaries[locale]()
