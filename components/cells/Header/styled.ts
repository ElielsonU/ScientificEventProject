import styled from "styled-components";

interface StyledHeaderProps { 
  justifyContent?: "space-between"|"space-evenly"
  width?: string;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  display: flex;
  justify-content: ${props => props.justifyContent};
  width: ${props => props.width};
  align-items: center;
  margin: 10px 0px;
`

export default StyledHeader