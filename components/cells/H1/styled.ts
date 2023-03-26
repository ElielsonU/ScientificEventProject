import styled from "styled-components";

interface H1Props{
    fontSize?: string;
    color?: string;
    textShadow?: string;
}

const StyledH1 = styled.h1<H1Props>`
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
    text-shadow: ${props => props.textShadow};
`

export default StyledH1