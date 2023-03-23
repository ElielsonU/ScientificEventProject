import styled from "styled-components";

interface StyledNumberInputprops {
  color?: string;
  fontSize?: number;
}

const StyledNumberInput = styled.input<StyledNumberInputprops>`
  background-color: transparent;
  border: none;
  text-align: right;
  color: ${props => props.color};
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
  color?: string;
  fontSize?: number;
}

const StyledNumberInputLabel = styled.label<StyledNumberInputLabelProps> `
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  border-bottom: 2px solid;
  gap: 10px;
  display: flex;
  width: fit-content;
` 

export {StyledNumberInput, StyledNumberInputLabel}