import React, { PropsWithChildren } from "react";
import StyledTextarea from "./styled";

interface TextareaProps extends PropsWithChildren{
    value?: string;
    color?: string;
    width?: string;
    height?: string;
    resize?: boolean;
    readonly?: boolean;
    fontSize?: string;
    required?: boolean;
    maxLength?: number;
    placeholder?: string;
    borderColor?: string;
    borderRadius?: string;
    backgroundColor?: string;
    onChange?: React.ChangeEventHandler;
}

const Textarea:React.FC<TextareaProps> = ({
    value,
    color,
    width,
    height,
    resize,
    onChange,
    readonly,
    fontSize,
    required,
    maxLength,
    placeholder,
    borderColor,
    borderRadius,
    backgroundColor,
    children
}) => {
    return <StyledTextarea color={color} width={width} height={height} fontSize={fontSize} borderColor={borderColor} borderRadius={borderRadius} backgroundColor={backgroundColor} value={value} onChange={onChange} maxLength={maxLength} resize={resize} required={required} placeholder={placeholder} readOnly={readonly}>
        {children}
    </StyledTextarea>
}

export default Textarea