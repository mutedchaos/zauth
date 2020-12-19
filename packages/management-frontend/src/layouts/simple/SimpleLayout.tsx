import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
}

const Header = styled.div`
  font-size: 30px;
  padding: 15px 15px 15px 30px;
  color: white;
  background: #c165b2;
  text-shadow: 4px 4px 4px black;
`

const Body = styled.div`
  padding: 20px;
`

export default function SimpleLayout({ children }: Props) {
  return (
    <div>
      <Header>ZAuth</Header>
      <Body>{children}</Body>
    </div>
  )
}
