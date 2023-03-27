import React, { PropsWithChildren, useState } from "react";
import { StyledCheckboxLabel, StyledCheckbox } from "./styled";
import Image from "next/image";
import Script from "next/script";


interface CheckboxProps extends PropsWithChildren {
  color?: string;
  fontSize?: number;
  onClick: React.MouseEventHandler;
  value?: boolean;
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
  const [isChoiced, setIsChoiced] = useState(true);
  function CheckboxHandler (event: React.MouseEvent): any {
    onClick(event);
    setIsChoiced(!isChoiced)
  }

  fontSize = fontSize||10

  return (
  <StyledCheckboxLabel fontSize={fontSize + "px"} color={color}>
    {children}
    <StyledCheckbox onClickCapture={CheckboxHandler} type="checkbox" name={name} value={Number(value)}/>
    <Script onReady={() => {setIsChoiced(true)}}>{` `}</Script>
    <Image 
    src={isChoiced?"/icons/cross.png": "/icons/correct.png"} 
    width={fontSize-1} 
    height={fontSize-1} 
    alt="HandlerIcon"
    />
  </StyledCheckboxLabel>)

}


export default Checkbox