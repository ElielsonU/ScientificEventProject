import styled from "styled-components";

interface StyledNumberInputprops {
  textColor: string;
  fontSize: number;
}

const StyledNumberInput = styled.input<StyledNumberInputprops>`
  background-color: transparent;
  border: none;
  text-align: right;
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize}px;
  width: 15px;
  &:focus {
    outline: none;
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

`

interface StyledNumberInputLabelProps {
  textColor: string;
  fontSize: number;
}

const StyledNumberInputLabel = styled.label<StyledNumberInputLabelProps> `
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize}px;
  border-bottom: 2px solid;
  gap: 10px;
  display: flex;
  width: fit-content;
` 

export {StyledNumberInput, StyledNumberInputLabel}