import styled from "styled-components";

interface StyledNumberInputprops {
  fontSize?: number;
  color?: string;
}

const StyledNumberInput = styled.input<StyledNumberInputprops>`
  background-color: transparent;
  border: none;
  text-align: right;
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  width: ${props => props.fontSize ? props.fontSize + props.fontSize*1.20 : 10}px;
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
  width: max-content;
` 

export {StyledNumberInput, StyledNumberInputLabel}