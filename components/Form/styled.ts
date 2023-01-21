import styled from "styled-components";

interface StyledFormProps {
  backgroundColor: string;
  width: string;
  height: string;
}

const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  padding: 25px 5px;

`

export default StyledForm