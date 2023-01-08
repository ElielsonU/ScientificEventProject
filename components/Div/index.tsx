import React, { PropsWithChildren } from "react";
import StyledDiv from "./styled";

interface DivProps extends PropsWithChildren {
  width: string;
  height: string;
  justifyContent: "space-between"|"space=around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  alignItems: "space-between"|"space=around"|"space-evenly"|"center"|"flex-end"|"flex-start"
  flexDirection: "row"|"column"
  borderRadius?: string;
  backgroundColor?: string;
  boxShadow?: string;
}

const Div:React.FC<DivProps> = ({
  width,
  height,
  justifyContent,
  alignItems,
  flexDirection,
  borderRadius,
  backgroundColor,
  boxShadow,
  children
}) => (
  <StyledDiv alignItems={alignItems} justifyContent={justifyContent} flexDirection={flexDirection} height={height} width={width} borderRadius={borderRadius} backgroundColor={backgroundColor} boxShadow={boxShadow}>
    {children}
  </StyledDiv>
)

export default Div