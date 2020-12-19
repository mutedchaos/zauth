import { ReactNode } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  color: white;
  background: blue;
  border: none;
  padding: 20px;
  min-width: 200px;
  border-radius: 10px 0;
  background: linear-gradient(123deg, #1f5379 0%, #3d8ac3 35%, #1f5379 80%, #1f5379 100%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  position: relative;
  cursor: pointer;
  > span {
    position: relative;
    z-index: 2;
  }
  &:hover {
  }
  &:hover::after {
    opacity: 1;
  }
  &::after {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: '';
    box-shadow: 0 8px 15px rgba(255, 0, 0, 0.4);
    background: linear-gradient(123deg, #1f5379 0%, #4d9ad3 35%, #1f5379 80%, #1f5379 100%);
    opacity: 0;
    transition: opacity 400ms linear;
  }
`

interface Props {
  children: ReactNode
  onClick?(): void
}

export function ActionButton({ children, ...rest }: Props) {
  return (
    <Button {...rest}>
      <span>{children}</span>
    </Button>
  )
}
