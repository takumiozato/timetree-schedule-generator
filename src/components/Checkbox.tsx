import { FC } from 'react'
import styled from 'styled-components'
import checkIcon from '../assets/check.svg'
import { colors } from '../consts/colors'

type CheckboxProps = {
  checked: boolean
  onChange: () => void
}

const StyledCheckbox = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${colors.border};
  appearance: none;
  cursor: pointer;

  &:checked::before {
    content: '';
    background-image: url(\"${checkIcon}\");
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    height: 100%;
  }
`

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <StyledCheckbox type="checkbox" checked={checked} onChange={onChange} />
  )
}
