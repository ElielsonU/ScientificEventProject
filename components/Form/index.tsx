import React, { PropsWithChildren } from "react";
import StyledForm from "./styled";

interface FormProps extends PropsWithChildren {
  backgroundColor: string;
  width: string;
  height: string;
  onSubmit: React.FormEventHandler;
  Id?: string;
  name?: string;
}

const Form: React.FC<FormProps> = ({
  backgroundColor,
  width,
  height,
  onSubmit,
  Id,
  name,
  children
}) => (
  <StyledForm backgroundColor={backgroundColor} width={width} height={height} onSubmit={onSubmit} id={Id} name={name}>{children}</StyledForm>
)

export default Form