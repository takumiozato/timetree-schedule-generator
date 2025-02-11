import styled from 'styled-components'
import ErrorIcon from '../assets/error.svg'
import { colors } from '../consts/colors'

const TooltipContainer = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid ${colors.border};
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 2px 3px 2px 0px #00000040;

  &::before {
    position: absolute;
    content: '';
    border-left: 11px solid transparent;
    border-top: 11px solid ${colors.border};
    top: -6px;
    left: 20px;
    transform: translateX(-50%) rotate(-45deg);
  }

  &::after {
    position: absolute;
    content: '';
    border-left: 10px solid transparent;
    border-top: 10px solid #fff;
    top: -5px;
    left: 20px;
    transform: translateX(-50%) rotate(-45deg);
  }
`

interface TooltipProps {
  message: string
  targetElement: HTMLElement | null
}

export const Tooltip: React.FC<TooltipProps> = ({ message, targetElement }) => {
  if (!targetElement) return null

  const rect = targetElement.getBoundingClientRect()
  const top = rect.bottom + window.scrollY + 10 // ツールチップをターゲットの下に配置
  const left = rect.left + window.scrollX + rect.width / 3

  return (
    <TooltipContainer style={{ top, left }}>
      <img src={ErrorIcon} alt="Error" />
      {message}
    </TooltipContainer>
  )
}
