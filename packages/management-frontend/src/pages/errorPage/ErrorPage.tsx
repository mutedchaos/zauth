import React from 'react'
import { ActionButton } from '../../commonComponents/buttons/ActionButton'
import styled from 'styled-components'
import { PageHeading } from '../../commonComponents/PageHeading'
import useTranslations from '../../hooks/useTranslations'
import SimpleLayout from '../../layouts/simple/SimpleLayout'
import translations from './translations.json'

interface Props {
  error: Error
  onConfirm(): void
}

const Deets = styled.div`
  border-left: 4px solid silver;
  margin-top: 20px;
  padding: 1px 30px;
`

export default function ErrorPage({ error, onConfirm }: Props) {
  const T = useTranslations(translations)
  return (
    <SimpleLayout>
      <PageHeading>{T.title}</PageHeading>
      <p>{T.overview}</p>
      <div>
        <ActionButton onClick={onConfirm}>{T.submit}</ActionButton>
      </div>
      <Deets>
        <p>{error.message}</p>
        <p>{error.stack}</p>
      </Deets>
    </SimpleLayout>
  )
}
