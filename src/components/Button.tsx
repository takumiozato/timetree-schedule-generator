import { FC } from 'react'
import styled from 'styled-components'
import { colors } from '../consts/colors'

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
  background-color: ${colors.brand};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${colors.brandHover};
  }

  &:disabled {
    background-color: ${colors.brandDisabled};
    cursor: not-allowed;
  }
`

export const Button: FC<ButtonProps> = ({
  type,
  children,
  onClick,
  disabled,
}) => <StyledButton {...{ type, onClick, disabled }}>{children}</StyledButton>
