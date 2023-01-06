import React, { PropsWithChildren } from "react";
import StyledButton from "./styled";

interface ButtonsProps extends PropsWithChildren {
  textColor: string;
  backgroundColor: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
  buttonType: "login"|"signup"|"resetpassword"|"submit";
}

const Button:React.FC<ButtonsProps> = ({
  backgroundColor,
  textColor,
  buttonType,
  disabled,
  children,
  onClick
}
  ) => {
    if (buttonType == "login") {
      return <StyledButton backgroundColor={backgroundColor} textColor={textColor} border onClick={onClick}>
      {children}
    </StyledButton>
    }
    if (buttonType == "resetpassword") {
      return disabled
      ?(<StyledButton backgroundColor={"#2A292C"} textColor={"#2A292C"}>
        {children}
      </StyledButton>
      )
      :(<StyledButton backgroundColor={backgroundColor} textColor={textColor} hoverDropShadow onClick={onClick}>
          {children}
        </StyledButton>
      )
    }
    if (buttonType == "submit") {
      return <StyledButton backgroundColor={backgroundColor} textColor={textColor} defaultDropShadow onClick={onClick}>
        {children}
      </StyledButton>
    }
    return <StyledButton backgroundColor={backgroundColor} textColor={textColor} onClick={onClick}>
      {children}
    </StyledButton>
    
  }
    

export default Button