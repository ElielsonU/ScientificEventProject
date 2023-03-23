import React, { PropsWithChildren } from "react";
import StyledDiv from "./styled";

interface DivProps extends PropsWithChildren {
  width?: string;
  height?: string;
  justifyContent?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  alignItems?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  flexDirection?: "row"|"column"|"row-reverse"|"column-reverse"
  borderRadius?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  boxShadow?: string;
  Id?: string;
}

const Div:React.FC<DivProps> = ({
  width,
  height,
  justifyContent,
  alignItems,
  flexDirection,
  borderRadius,
  backgroundColor,
  backgroundImage,
  boxShadow,
  Id,
  children
}) => (
  <StyledDiv alignItems={alignItems} justifyContent={justifyContent} flexDirection={flexDirection} height={height} width={width} borderRadius={borderRadius} backgroundColor={backgroundColor} boxShadow={boxShadow} backroundImage={backgroundImage} id={Id}>
    {children}
  </StyledDiv>
)

export default Div