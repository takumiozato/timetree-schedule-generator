import { FC } from 'react';
import styled from 'styled-components';

type InputProps = {
  placeholder: string;
};

const StyledInput = styled.input`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #adbbc4;
  font-size: 16px;
  font-weight: 500;
`;

export const Input: FC<InputProps> = ({ placeholder }) => {
  return <StyledInput type="text" placeholder={placeholder} />;
};
