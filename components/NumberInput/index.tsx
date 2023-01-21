import React, { PropsWithChildren, useState } from "react";
import { StyledNumberInput, StyledNumberInputLabel } from "./styled";
import Image from "next/image";

interface NumberInputProps extends PropsWithChildren {
  onChange?: React.ChangeEventHandler;
  textColor: string;
  fontSize: number;
}

const NumberInput:React.FC<NumberInputProps> = ({
  onChange,
  textColor,
  fontSize,
  children
}) => {

  const [numberInputValue, setnumberInputValue] = useState(0);

  const InputValueChangeHandler = (increment?: number) => {
    if (increment) {
      return numberInputValue + increment < 0?null:setnumberInputValue(numberInputValue + increment)
    }
  }

  return (<StyledNumberInputLabel textColor={textColor} fontSize={fontSize}>
    {children}
    <StyledNumberInput value={numberInputValue} onChange={(event) => {
      const inputValue = (event.target as HTMLInputElement).value
      setnumberInputValue(Number(inputValue))
      onChange?onChange(event):null
      }} type="number" min={0} textColor={textColor} fontSize={fontSize}/>
    <div style={{display: "flex", width: fontSize, flexDirection: "column"}}>
     <Image src="/icons/arrowUp.png" width={fontSize*0.90} height={fontSize*0.70} alt={"Arrow Up"} onChange={() => {InputValueChangeHandler(1)}}/>
     <Image src="/icons/arrowDown.png" width={fontSize*0.90} height={fontSize*0.70} alt={"Arrow Down"} onChange={() => {InputValueChangeHandler(-1)}}/>
    </div>
  </StyledNumberInputLabel>
  )
}

export default NumberInput