import styled from "styled-components";

interface TextInputProps {
  textColor?: string;
  width?: string;
  textAlign?: string;
  fontSize?: string;
}

const StyledTextInput = styled.input<TextInputProps>`
  background-color: transparent;
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize};
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