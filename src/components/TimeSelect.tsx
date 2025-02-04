import { FC } from 'react'
import styled from 'styled-components'

type TimeSelectProps = {
  value: string
  onChange: (value: string) => void
}

const StyledTimeSelect = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #f0f5f6;
  font-size: 16px;
  font-weight: 500;
  border: none;
  appearance: none;
`

export const TimeSelect: FC<TimeSelectProps> = ({ value, onChange }) => {
  const timeOptions = Array.from({ length: 48 }, (_, index) => {
    const hours = Math.floor(index / 2).toString().padStart(2, '0')
    const minutes = (index % 2 === 0 ? '00' : '30')
    return `${hours}:${minutes}`
  })

  return (
    <StyledTimeSelect value={value} onChange={(e) => onChange(e.target.value)}>
      {timeOptions.map(time => (
        <option key={time} value={time}>{time}</option>
      ))}
    </StyledTimeSelect>
  )
}
