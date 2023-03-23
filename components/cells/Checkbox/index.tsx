import React, { PropsWithChildren, useState } from "react";
import { StyledCheckboxLabel, StyledCheckbox } from "./styled";
import Image from "next/image";


interface CheckboxProps extends PropsWithChildren {
  color?: string;
  fontSize?: number;
  onClick?: React.MouseEventHandler;
  value?: string|number;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  color,
  fontSize,
  onClick,
  value,
  name,
  children
}) => {
  const [isChoiced, setIsChoiced] = useState("/icons/cross.png")
  fontSize = fontSize||10
  return (
  <StyledCheckboxLabel fontSize={fontSize + "px"} color={color}>
    {children}
    <StyledCheckbox onClickCapture={(event) => {
      onClick?onClick(event):null
      if (isChoiced == "/icons/cross.png"){
        return setIsChoiced("/icons/correct.png")
      }
      setIsChoiced("/icons/cross.png")
    }} value={value} type="checkbox" name={name}/>
    <Image 
    src={isChoiced} 
    width={fontSize-1} 
    height={fontSize-1} 
    alt="HandlerIcon"
    />
  </StyledCheckboxLabel>)

}


export default Checkbox