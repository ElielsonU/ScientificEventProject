import React, { PropsWithChildren } from "react";
import StyledTextInput from "./styled";

interface TextInputProps {
  onChange?: React.ChangeEventHandler;
  type: "text" | "email" | "password";
  value?: string | number;
  placeholder?: string;
  readonly?: boolean;
  fontSize?: string;
  required?: true;
  color?: string;
  width?: string;
  name: string;
}

const TextInput: React.FC<TextInputProps> = ({
  color: textColor,
  placeholder,
  fontSize,
  required,
  onChange,
  readonly,
  value,
  width,
  name,
  type
}) => {

  if (type == "password") {
    return <StyledTextInput
      textColor={textColor}
      placeholder={placeholder}
      readOnly={readonly}
      fontSize={fontSize}
      width={width}
      onChange={onChange}
      value={value}
      minLength={8}
      name={name}
      type={type}
      required
    />;
  }
  return (
    <StyledTextInput
      textColor={textColor}
      placeholder={placeholder}
      fontSize={fontSize}
      width={width}
      onChange={onChange}
      value={value}
      required={required}
      name={name}
      type={type}
      autoComplete={"off"}
      readOnly={readonly}
    />
  );
};

export default TextInput;
