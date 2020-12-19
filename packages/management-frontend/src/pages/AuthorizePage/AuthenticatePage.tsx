import { API } from '@vicion/zauth-api'
import { useEffect } from 'react'
import { PageHeading } from '../../commonComponents/PageHeading'
import useTranslations from '../../hooks/useTranslations'
import SimpleLayout from '../../layouts/simple/SimpleLayout'
import translations from './translations.json'

export default function AuthenticatePage() {
  const T = useTranslations(translations)
  useEffect(() => {
    sessionStorage.setItem('zauth-url', document.location.href)
    const nonce = (Math.random() + new Date().valueOf()).toString()
    sessionStorage.setItem('zauth-nonce', nonce)
    API.authorize
      .url({
        client_id: process.env.REACT_APP_CLIENT_ID!,
        nonce,
        scope: 'openid',
        redirect_uri: document.location.host + '/authenticate',
      })
      .then(({ url }) => (document.location.href = document.location.href = url))
  }, [])

  return (
    <SimpleLayout>
      <PageHeading>{T.title}</PageHeading>
      <p>{T.message}</p>
    </SimpleLayout>
  )
}
