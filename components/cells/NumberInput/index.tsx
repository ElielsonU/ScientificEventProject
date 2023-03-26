import React, { PropsWithChildren, useState } from "react";
import { StyledNumberInput, StyledNumberInputLabel } from "./styled";
import Image from "next/image";
import Div from "../Div";

interface NumberInputProps extends PropsWithChildren {
  setValue: Function;
  fontSize?: number;
  color?: string;
  value: number;
  name: string;
}

const NumberInput:React.FC<NumberInputProps> = ({
  color,
  fontSize,
  name,
  value,
  setValue,
  children
}) => {

  const arrowClickHandler = (increment?: number) => {
    if (increment) {
      (value + increment) < 0?null:setValue(Number(value) + increment)
    }
  }

  const numberInputChangeHandler = (event: React.ChangeEvent) => {
    const inputValue = (event.target as HTMLInputElement).value
    setValue(inputValue)
  }

  fontSize = fontSize||10

  return (
  <StyledNumberInputLabel color={color} fontSize={fontSize}>
    {children}
    <StyledNumberInput name={name} value={value} onChange={numberInputChangeHandler}
      type="number" min={0} color={color} fontSize={fontSize}/>
    <Div flexDirection="column" width={fontSize + "px"}>
     <Image src="/icons/arrowUp.png" width={fontSize*0.90} height={fontSize*0.70} alt={"Arrow Up"} onClickCapture={() => {arrowClickHandler(1)}}/>

     <Image src="/icons/arrowDown.png" width={fontSize*0.90} height={fontSize*0.70} alt={"Arrow Down"} onClickCapture={() => {arrowClickHandler(-1)}}/>
    </Div>
  </StyledNumberInputLabel>
  )
}

export default NumberInput