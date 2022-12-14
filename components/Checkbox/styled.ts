import styled from "styled-components";

const StyledCheckbox = styled.input` display: none; `

interface StyledCheckboxLabelProps {
  textColor: string;
  fontSize: string;
}

const StyledCheckboxLabel = styled.label<StyledCheckboxLabelProps>`
  color: ${ props => props.textColor};
  border-bottom: 2px solid;
  font-size: ${props => props.fontSize};
  gap: 10px;
  display: flex;
  align-items: center;
  width: max-content;
`

export {StyledCheckboxLabel, StyledCheckbox}