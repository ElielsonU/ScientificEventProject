import styled from "styled-components";

interface StyledFormProps {
  justifyContent?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start";
  alignItems?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start";
  backgroundColor?: string;
  borderRadius?:string;
  boxShadow?: string;
  height?: string;
  width?: string; 
}

const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  justify-content: ${props => props.justifyContent};
  border-radius: ${props => props.borderRadius};
  align-items: ${props => props.alignItems};
  flex-direction: column;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  box-shadow: ${props => props.boxShadow?"0px 0px 4px "+ props.boxShadow: null };
`

export default StyledForm