import styled from "styled-components";

interface StyledDivProps {
  width: string;
  height: string;
  justifyContent: "space-between"|"space=around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  alignItems: "space-between"|"space=around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  flexDirection: "row"|"column"
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
}

const StyledDiv = styled.div<StyledDivProps>`
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  flex-direction: ${props => props.flexDirection};
  flex-wrap: wrap;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  overflow: hidden;
  box-shadow: ${props => props.boxShadow?`0px 0px 10px ${props.boxShadow}`:"none"};
  
`

export default StyledDiv