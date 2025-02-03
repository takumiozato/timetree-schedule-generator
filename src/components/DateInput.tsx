import { FC } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import styled from 'styled-components'

const StyledDateInput = styled.div<{ $hasError?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #f0f5f6;
  font-size: 16px;
  font-weight: 500;
  border: ${({ $hasError }) => $hasError && '1px solid #f44336'};

  button {
    border: none;
    background-color: inherit;
    padding: 0;
  }
`

type DateInputProps = {
  id?: string
  value: Date | null
  onChange: (date: Date | null) => void
  hasError?: boolean
}

export const DateInput: FC<DateInputProps> = ({
  id,
  value,
  onChange,
  hasError,
}) => {
  return (
    <StyledDateInput {...{ id }} $hasError={hasError}>
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="yyyy年MM月dd日 E"
        locale={ja}
        customInput={
          <button type="button">
            {value
              ? format(value, 'yyyy年MM月dd日 E', { locale: ja })
              : '日付を選択'}
          </button>
        }
      />
    </StyledDateInput>
  )
}
