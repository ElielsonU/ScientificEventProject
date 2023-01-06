import React, { PropsWithChildren, useState } from "react";
import { StyledCheckboxLabel, StyledCheckbox } from "./styled";
import Image from "next/image";


interface CheckboxProps extends PropsWithChildren {
  textColor: string;
  fontSize: number;
  onChange?: React.ChangeEventHandler;
  value: string|number;
}

const Checkbox: React.FC<CheckboxProps> = ({
  textColor,
  fontSize,
  onChange,
  value,
  children
}) => {
  const [isChoiced, setIsChoiced] = useState("/icons/cross.png")

  return (
  <StyledCheckboxLabel fontSize={fontSize + "px"} textColor={textColor}>
    {children}
    <StyledCheckbox onChange={(event) => {
      onChange?onChange(event):null
      if (isChoiced == "/icons/cross.png"){
        return setIsChoiced("/icons/correct.png")
      }
      setIsChoiced("/icons/cross.png")
    }} value={value} type="checkbox"/>
    <Image 
    src={isChoiced} 
    width={fontSize-1} 
    height={fontSize-1} 
    alt="HandlerIcon"
    />
  </StyledCheckboxLabel>)

}


export default Checkbox