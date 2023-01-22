import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonsProps extends PropsWithChildren {
  textColor?: string;
  backgroundColor?: string;
  border?: boolean;
  defaultDropShadow?: boolean;
  hoverDropShadow?:boolean;
  icon?: string;
}

const StyledButton = styled.button<ButtonsProps>`
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  box-shadow: 0px 0px 4px ${props => props.defaultDropShadow?props.backgroundColor:"none"};
  font-size: 24px;
  font-weight: 700;
  ${props => props.icon?"": `
  border-radius: 15px; 
  padding: 10px 20px;
  border: solid 3px ${props.border?props.textColor:props.backgroundColor};`}
  transition: all .2s ease-in;
  &:active {
    color: ${props => props.backgroundColor};
    ${props => props.border?"":`border-color: ${props.textColor};`}
    box-shadow: ${props => props.hoverDropShadow?"0px 0px 4px":"none"};
    background-color: ${props => props.textColor};
  }
`

export default StyledButton