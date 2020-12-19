export default function useTranslations<T extends { en: any }>(translations: T): T['en'] {
  return translations.en
}
