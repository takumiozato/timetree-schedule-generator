import { FC } from 'react';
import styled from 'styled-components';

type TextAreaProps = {
  placeholder?: string;
  rows?: number;
};

const StyledTextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid #adbbc4;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
`;

export const TextArea: FC<TextAreaProps> = ({ placeholder, rows = 4 }) => {
  return <StyledTextArea placeholder={placeholder} rows={rows} />;
};
