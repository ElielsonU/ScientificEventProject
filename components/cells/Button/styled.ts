import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonsProps extends PropsWithChildren {
  color?: string;
  bgColor?: string;
  border?: boolean;
  defaultDropShadow?: boolean;
  hoverDropShadow?:boolean;
  icon?: boolean;
}

const StyledButton = styled.button<ButtonsProps>`
  color: ${props => (props.color || "inherit")};
  background-color: ${props => (props.bgColor || "inherit")};
  box-shadow: 0px 0px 4px ${props => props.defaultDropShadow?props.bgColor:"none"};
  font-size: 20px;
  font-weight: 700;
  ${props => props.icon?"": `
  border-radius: 15px; 
  padding: 10px 20px;
  border: solid 3px ${props.border?props.color:props.bgColor};`}
  transition: all .2s ease-in;
  &:active {
    color: ${props => props.bgColor};
    ${props => props.border?"":`border-color: ${props.color};`}
    box-shadow: ${props => props.hoverDropShadow?"0px 0px 4px":"none"};
    background-color: ${props => props.color};
  }
`

export default StyledButton