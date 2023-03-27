import styled from "styled-components";

interface StyledTextareaProps {
    color?: string;
    width?: string;
    height?: string;
    resize?: boolean;
    fontSize?: string;
    borderColor?: string;
    borderRadius?: string;
    backgroundColor?: string;
}

const StyledTextarea = styled.textarea<StyledTextareaProps>`
    color: ${props => props.color};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: ${props => props.fontSize};
    border-color: ${props => props.borderColor};
    border-radius: ${props => props.borderRadius};
    background-color: ${props => props.backgroundColor};
    resize: ${props => props.resize? "both" : "none"};

    &:focus { outline: none; }
`

export default StyledTextarea