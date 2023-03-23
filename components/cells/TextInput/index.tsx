import React, { PropsWithChildren } from "react";
import StyledTextInput from "./styled";

interface TextInputProps {
  color?: string;
  placeholder?: string;
  fontSize?: string;
  onChange?: React.ChangeEventHandler;
  width?: string;
  value?: string | number;
  required?: true;
  type: "text" | "email" | "password";
  name: string;
}

const TextInput: React.FC<TextInputProps> = ({
  color: textColor,
  placeholder,
  fontSize,
  onChange,
  value,
  width,
  required,
  name,
  type
}) => {

  if (type == "password") {
    return <StyledTextInput
      textColor={textColor}
      placeholder={placeholder}
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
    />
  );
};

export default TextInput;
