import { FC } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  display: flex;
  column-gap: 2px;
`

const RequiredMark = styled.span`
  color: #ff3d72;
`

type LabelProps = {
  children: string
  required?: boolean
}

export const Label: FC<LabelProps> = ({ children, required }) => {
  return (
    <StyledLabel>
      {children}
      {required && <RequiredMark>*</RequiredMark>}
    </StyledLabel>
  )
}
