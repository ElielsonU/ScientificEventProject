import React, { PropsWithChildren } from "react";
import StyledH1 from "./styled";

interface H1Props extends PropsWithChildren{
    fontSize?: string;
    color?: string;
    textShadow?: string;
}

const H1:React.FC<H1Props> = ({
    fontSize,
    color,
    textShadow,
    children,
}) => (
    <StyledH1 fontSize={fontSize} color={color} textShadow={textShadow}>
        {children}
    </StyledH1>
)

export default H1