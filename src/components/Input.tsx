import { FC } from 'react';
import styled from 'styled-components';

type InputProps = {
  id?: string;
  type: "text" | "url";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hasError?: boolean;
};

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ hasError }) => (hasError ? '#f44336' : '#adbbc4')};
  font-size: 16px;
  font-weight: 500;
  outline: none;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? '#f44336' : '#2495E7')};
  }
`;

export const Input: FC<InputProps> = ({ id, type, value, onChange, placeholder, hasError }) => {
  return <StyledInput {...{ id, type, value, onChange, placeholder, hasError }} />;
};
