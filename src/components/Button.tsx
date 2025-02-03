import { FC } from 'react'
import styled from 'styled-components'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: string
  onClick?: () => void
  disabled?: boolean
}

const StyledButton = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
  border: none;
  background-color: #2ecc87;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #2e9f64;
  }

  &:disabled {
    background-color: #baead5;
    cursor: not-allowed;
  }
`

export const Button: FC<ButtonProps> = ({
  type,
  children,
  onClick,
  disabled,
}) => <StyledButton {...{ type, onClick, disabled }}>{children}</StyledButton>
