import styled from "styled-components";

interface StyledHeaderProps { justifyContent: "space-between"|"space-evenly" }

const StyledHeader = styled.header<StyledHeaderProps>`
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
  margin: 35px 30px;
`

export default StyledHeader