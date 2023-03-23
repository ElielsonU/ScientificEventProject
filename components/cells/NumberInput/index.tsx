import React, { PropsWithChildren, useState } from "react";
import { StyledNumberInput, StyledNumberInputLabel } from "./styled";
import Image from "next/image";

interface NumberInputProps extends PropsWithChildren {
  onChange?: React.ChangeEventHandler;
  color?: string;
  fontSize?: number;
  name: string;
}

const NumberInput:React.FC<NumberInputProps> = ({
  onChange,
  color,
  fontSize,
  name,
  children
}) => {

  const [numberInputValue, setnumberInputValue] = useState(0);

  const InputValueChangeHandler = ( event: React.SyntheticEvent, increment?: number) => {
    if (increment) {
      return (numberInputValue + increment) < 0?null:setnumberInputValue(numberInputValue + increment)
    }
  }

  fontSize = fontSize||10

  return (<StyledNumberInputLabel color={color} fontSize={fontSize}>
    {children}
    <StyledNumberInput name={name} value={numberInputValue} onChange={(event) => {
      const inputValue = (event.target as HTMLInputElement).value
      setnumberInputValue(Number(inputValue))
      onChange?onChange(event):null
      }} type="number" min={0} color={color} fontSize={fontSize}/>
    <div style={{display: "flex", width: fontSize, flexDirection: "column"}}>
     <Image src="/icons/arrowUp.png" width={fontSize*0.90} height={fontSize*0.70} alt={"Arrow Up"} onClickCapture={(event) => {InputValueChangeHandler(event, 1)}}/>
     <Image src="/icons/arrowDown.png" width={fontSize*0.90} height={fontSize*0.70} alt={"Arrow Down"} onClickCapture={(event) => {InputValueChangeHandler(event, -1)}}/>
    </div>
  </StyledNumberInputLabel>
  )
}

export default NumberInput