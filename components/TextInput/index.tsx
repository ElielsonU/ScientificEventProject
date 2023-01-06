import React, { PropsWithChildren } from "react";
import StyledTextInput from "./styled";

interface TextInputProps {
  textColor: string;
  placeholder: string;
  fontSize: string;
  onChange?: React.ChangeEventHandler;
  width: string;
  value: string | number;
  required?: true;
  type: "text" | "email" | "password";
}

const TextInput: React.FC<TextInputProps> = ({
  textColor,
  placeholder,
  fontSize,
  onChange,
  value,
  width,
  required,
  type,
}) => {
  if (type == "password") {
    <StyledTextInput
      textColor={textColor}
      placeholder={placeholder}
      fontSize={fontSize}
      width={width}
      onChange={onChange}
      value={value}
      minLength={8}
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
    />
  );
};

export default TextInput;
