import React, { PropsWithChildren } from "react";
import StyledDiv from "./styled";

interface DivProps extends PropsWithChildren {
  justifyContent?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  alignItems?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  flexDirection?: "row"|"column"|"row-reverse"|"column-reverse"
  backgroundColor?: string;
  backgroundImage?: string;
  borderRadius?: string;
  boxShadow?: string;
  height?: string;
  color?: string;
  width?: string;
  Id?: string;
}

const Div:React.FC<DivProps> = ({
  backgroundColor,
  backgroundImage,
  justifyContent,
  flexDirection,
  borderRadius,
  alignItems,
  boxShadow,
  children,
  height,
  width,
  color,
  Id,
}) => (
  <StyledDiv alignItems={alignItems} justifyContent={justifyContent} flexDirection={flexDirection} height={height} width={width} borderRadius={borderRadius} backgroundColor={backgroundColor} boxShadow={boxShadow} backroundImage={backgroundImage} id={Id} color={color}>
    {children}
  </StyledDiv>
)

export default Div