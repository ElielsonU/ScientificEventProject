import React, { PropsWithChildren } from "react";
import StyledTextInput from "./styled";

interface TextInputProps {
  onChange?: React.ChangeEventHandler;
  textAlign?: "center" | "right"| "left";
  type: "text" | "email" | "password";
  value?: string | number;
  placeholder?: string;
  fontWeight?: string;
  maxLenght?: number;
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
  fontWeight,
  textAlign,
  maxLenght,
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
      placeholder={placeholder}
      fontWeight={fontWeight}
      textAlign={textAlign}
      textColor={textColor}
      readOnly={readonly}
      fontSize={fontSize}
      onChange={onChange}
      width={width}
      value={value}
      minLength={8}
      name={name}
      type={type}
      required
    />;
  }
  return (
    <StyledTextInput
      placeholder={placeholder}
      fontWeight={fontWeight}
      textAlign={textAlign}
      textColor={textColor}
      maxLength={maxLenght}
      autoComplete="off"
      fontSize={fontSize}
      required={required}
      onChange={onChange}
      readOnly={readonly}
      value={value}
      width={width}
      name={name}
      type={type}
    />
  );
};

export default TextInput;
