import React, { PropsWithChildren } from "react";
import StyledHeader from "./styled";

interface HeaderProps extends PropsWithChildren { 
  justifyContent?:"space-evenly"|"space-between"
}

const Header:React.FC<HeaderProps> = ({
    justifyContent,
    children
}) => (
  <StyledHeader justifyContent={justifyContent} >
    {children}
  </StyledHeader>
)

export default Header