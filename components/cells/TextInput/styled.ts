import styled from "styled-components";

interface TextInputProps {
  textAlign?: "center"|"right"|"left";
  fontWeight?: string;
  textColor?: string;
  fontSize?: string;
  width?: string;
}

const StyledTextInput = styled.input<TextInputProps>`
  text-align: ${props => props.textAlign};
  background-color: transparent;
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  width: ${props => props.width};
  border: 0px;
  border-bottom: 1px solid;
  padding: 1px 10px;
  &::-webkit-inner-spin-button , &::-webkit-outer-spin-button{
    -webkit-appearance: none;
  }
  &:focus {
    outline: none;
  }
`

export default StyledTextInput