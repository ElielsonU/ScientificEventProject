import styled from "styled-components";

interface SpanProps{
    fontSize?: string;
    color?: string;
}

const StyledSpan = styled.span<SpanProps>`
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
`

export default StyledSpan