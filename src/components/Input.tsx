import { FC } from 'react'
import styled from 'styled-components'
import { colors } from '../consts/colors'

type InputProps = {
  id?: string
  type: 'text' | 'url'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  hasError?: boolean
}

const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ $hasError }) => ($hasError ? colors.error : colors.border)};
  font-size: 16px;
  font-weight: 500;
  outline: none;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? colors.error : colors.focus)};
  }
`

export const Input: FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  hasError,
}) => {
  const inputProps = { id, type, value, onChange, placeholder }

  return <StyledInput {...inputProps} $hasError={hasError} />
}
