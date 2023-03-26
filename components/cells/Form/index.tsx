import React, { PropsWithChildren } from "react";
import StyledForm from "./styled";

interface FormProps extends PropsWithChildren {
  justifyContent?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start";
  alignItems?: "space-between"|"space-around"|"space-evenly"|"center"|"flex-end"|"flex-start";
  onSubmit: React.FormEventHandler;
  backgroundColor?: string;
  boxShadow?: string;
  height?: string;
  width?: string;
  name?: string;
}

const Form: React.FC<FormProps> = ({
  backgroundColor,
  justifyContent,
  boxShadow,
  children,
  onSubmit,
  height,
  width,
  name,
}) => (
  <StyledForm backgroundColor={backgroundColor} width={width} height={height} onSubmit={onSubmit} name={name} justifyContent={justifyContent} boxShadow={boxShadow}>
    {children}
  </StyledForm>
)

export default Form