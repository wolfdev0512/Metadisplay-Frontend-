import styled from "styled-components";
import NumericInput from "react-numeric-input";

export const MintInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 20px auto;
  span {
    input {
      border: none !important;
      color: white;
      background-color: #3b3b3b !important;
      cursor: initial;
    }
    b {
      display: none;
    }
  }
`;

export const MintNumericInput = styled(NumericInput)`
  height: 60px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 20px;
  font-size: 14px;
`;

export const MintInputActions = styled.div`
  height: 100%;
`;

const MintInputStep = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: #3b3b3b;
  text-decoration: none;
  padding: 5px 15px;
  transition: all 0.2s ease;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #10121b;
  }
`;

export const MintInputStepIncrease = styled(MintInputStep)`
  border-top-right-radius: 10px;
`;

export const MintInputStepDecrease = styled(MintInputStep)`
  border-bottom-right-radius: 10px;
`;
