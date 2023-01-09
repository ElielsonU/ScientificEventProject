import React, { PropsWithChildren } from "react";
import StyledForm from "./styled";

interface FormProps extends PropsWithChildren {
  backgroundColor: string;
  width: string;
  height: string;
  onSubmit: React.FormEventHandler;
}

const Form: React.FC<FormProps> = ({
  backgroundColor,
  width,
  height,
  onSubmit,
  children
}) => (
  <StyledForm backgroundColor={backgroundColor} width={width} height={height} onSubmit={onSubmit}>{children}</StyledForm>
)

export default Form