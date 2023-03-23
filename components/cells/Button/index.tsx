import Image from "next/image";
import React, { PropsWithChildren } from "react";
import StyledButton from "./styled";

interface ButtonsProps extends PropsWithChildren {
  color?: string;
  bgColor?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  padding?: boolean;
  type: "login"|"signup"|"resetpassword"|"submit"|"icon";
}

const Button:React.FC<ButtonsProps> = ({
  bgColor,
  color,
  type,
  disabled,
  children,
  onClick
}
  ) => {
    if (type == "login") {
      return <StyledButton bgColor={bgColor} color={color} border onClickCapture={onClick}>
      {children}
    </StyledButton>
    }
    if (type == "resetpassword") {
      return disabled
      ?(<StyledButton bgColor={"#2A292C"} color={"#2A292C"} disabled>
        {children}
      </StyledButton>
      )
      :(<StyledButton bgColor={bgColor} color={color} hoverDropShadow onClickCapture={onClick}>
          {children}
        </StyledButton>
      )
    }
    if (type == "submit") {
      return <StyledButton bgColor={bgColor} color={color} defaultDropShadow onClickCapture={onClick}>
        {children}
      </StyledButton>
    }
    if (type == "icon") {
      return <StyledButton bgColor={bgColor} color={color} onClickCapture={onClick} icon>
        <Image src={`/icons/send.png`} width={20} height={20} alt={"send icon"}></Image>
      </StyledButton>
    }
    return <StyledButton bgColor={bgColor} color={color} onClickCapture={onClick}>
      {children}
    </StyledButton>
    
  }
    

export default Button