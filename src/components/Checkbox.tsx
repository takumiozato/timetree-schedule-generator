import { FC } from 'react';
import styled from 'styled-components';

type CheckboxProps = {
    checked: boolean;
    onChange: () => void;
};

const StyledCheckbox = styled.input`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #adbbc4;
    appearance: none;
`;

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <StyledCheckbox type="checkbox" checked={checked} onChange={onChange} />
    );
}