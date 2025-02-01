import { FC } from 'react';
import styled from 'styled-components';

type ButtonProps = {
    children: string;
    onClick?: () => void;
    disabled?: boolean;
}

const StyledButton = styled.button`
    padding: 10px 16px;
    border-radius: 4px;
    border: none;
    background-color: #2ECC87;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        background-color: #2E9F64;
    }

    &:disabled {
        background-color: #BAEAD5;
        cursor: not-allowed;
    }
`;

export const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => (
    <StyledButton onClick={onClick} disabled={disabled}>{children}</StyledButton>
);