import styled from "styled-components";

interface StyledDivProps {
  justifyContent?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  alignItems?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  flexDirection?: "row"|"column"|"row-reverse"|"column-reverse"
  backgroundColor?: string;
  backroundImage?:string;
  borderRadius?: string;
  boxShadow?: string;
  height?: string;
  color?: string;
  width?: string;
}

const StyledDiv = styled.div<StyledDivProps>`
  color: ${props => props.color};
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  flex-direction: ${props => props.flexDirection};
  flex-wrap: wrap;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  background-image: url(${props => "/img/" + props.backroundImage});
  background-repeat: no-repeat;
  background-size: 105%;
  background-position: auto;
  border-radius: ${props => props.borderRadius};
  overflow: hidden;
  box-shadow: ${props => props.boxShadow?`0px 0px 10px ${props.boxShadow}`:"none"};
  transition: all .1s ease-in;
  
  @media (max-width: 1005px){
    & {  background-size: 150%;  }
  }
  @media (orientation: portrait){
    & {  background-size: 360%;  }
  }
`

export default StyledDiv