import { FC } from 'react';
import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`;

type InputWrapperProps = {
  children: React.ReactNode;
};

export const InputWrapper: FC<InputWrapperProps> = ({ children }) => {
  return <StyledInputWrapper>{children}</StyledInputWrapper>;
};
