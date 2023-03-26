import React, { PropsWithChildren } from "react";
import StyledSpan from "./styled";

interface SpanProps extends PropsWithChildren{
    fontSize?: string;
    color?: string;
}

const Span:React.FC<SpanProps> = ({
    fontSize,
    color, 
    children
}) => (
    <StyledSpan fontSize={fontSize} color={color}>
        {children}
    </StyledSpan>
)

export default Span