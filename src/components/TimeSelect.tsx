import { FC } from 'react';
import styled from 'styled-components';

type TimeSelectProps = {
    value: string;
    onChange: (value: string) => void;
};

const StyledTimeSelect = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #F0F5F6;
  font-size: 16px;
  font-weight: 500;
  border: none;
  appearance: none;
`;

export const TimeSelect: FC<TimeSelectProps> = ({ value, onChange }) => (
    <StyledTimeSelect value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="00:00">00:00</option>
        <option value="01:00">01:00</option>
        <option value="02:00">02:00</option>
        <option value="03:00">03:00</option>
        <option value="04:00">04:00</option>
        <option value="05:00">05:00</option>
        <option value="06:00">06:00</option>
        <option value="07:00">07:00</option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
        <option value="22:00">22:00</option>
        <option value="23:00">23:00</option>
        <option value="24:00">24:00</option>
    </StyledTimeSelect>
)