import useTranslations from '../hooks/useTranslations'
import translations from './translations.json'

export function Loading() {
  const T = useTranslations(translations)
  return <span>{T.loading}</span>
}
