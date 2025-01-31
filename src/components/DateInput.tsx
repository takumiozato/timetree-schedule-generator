import { FC } from 'react';
import styled from 'styled-components';


const StyledDateInput = styled.input`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #F0F5F6;
  font-size: 16px;
  font-weight: 500;
  border: none;
`;

export const DateInput: FC = () => {
    return <StyledDateInput type="date" />;
};
