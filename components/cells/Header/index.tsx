import React, { PropsWithChildren } from "react";
import StyledHeader from "./styled";

interface HeaderProps extends PropsWithChildren { 
  justifyContent?:"space-evenly"|"space-between"
  width?: string;
}

const Header:React.FC<HeaderProps> = ({
    justifyContent,
    width,
    children
}) => (
  <StyledHeader justifyContent={justifyContent} width={width}>
    {children}
  </StyledHeader>
)

export default Header