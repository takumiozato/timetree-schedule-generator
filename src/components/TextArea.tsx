import { FC } from 'react'
import styled from 'styled-components'

type TextAreaProps = {
  id?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  hasError?: boolean
}

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#f44336' : '#adbbc4')};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  outline: none;
  resize: none;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#f44336' : '#2495E7')};
  }
`

export const TextArea: FC<TextAreaProps> = ({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  hasError,
}) => {
  return (
    <StyledTextArea
      {...{ id, value, onChange, placeholder, rows }}
      $hasError={hasError}
    />
  )
}
