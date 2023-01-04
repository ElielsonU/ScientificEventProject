import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonsProps extends PropsWithChildren {
  textColor: string;
  backgroundColor: string;
  border?: boolean;
  defaultDropShadow?: boolean;
  hoverDropShadow?:boolean;
}

const StyledButton = styled.button<ButtonsProps>`
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  border: solid 3px ${props => props.border?props.textColor:props.backgroundColor};
  box-shadow: 0px 0px 4px ${props => props.defaultDropShadow?props.backgroundColor:"none"};
  border-radius: 15px;
  font-size: 24px;
  font-weight: 700;
  padding: 10px 20px;
  transition: all .2s ease-in;
  &:active {
    color: ${props => props.backgroundColor};
    ${props => props.border?"":`border-color: ${props.textColor};`}
    box-shadow: ${props => props.hoverDropShadow?"0px 0px 4px":"none"};
    background-color: ${props => props.textColor};
  }
`

export default StyledButton