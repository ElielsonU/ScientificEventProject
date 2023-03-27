import Image from "next/image";
import React, { PropsWithChildren } from "react";
import StyledButton from "./styled";

interface ButtonsProps extends PropsWithChildren {
  type: "login"|"signup"|"resetpassword"|"submit"|"icon";
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  padding?: boolean;
  bgColor?: string;
  color?: string;
  icon?: string;
}

const Button:React.FC<ButtonsProps> = ({
  iconHeight,
  iconWidth,
  disabled,
  children,
  onClick,
  bgColor,
  color,
  type,
  icon,
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
        <Image src={`/icons/${icon}.png`} width={iconWidth||20} height={iconHeight||20} alt={"send icon"} style={{verticalAlign: "middle"}}/>
      </StyledButton>
    }
    return <StyledButton bgColor={bgColor} color={color} onClickCapture={onClick}>
      {children}
    </StyledButton>
    
  }
    

export default Button