import React, { useEffect } from "react";

import {
  MintInputActions,
  MintInputContainer,
  MintInputStepDecrease,
  MintInputStepIncrease,
  MintNumericInput,
} from "./styled";

import { MintInputProps } from "types/Input";

const MintInput: React.FC<MintInputProps> = ({
  amount,
  setAmount,
  mintable,
}) => {
  useEffect(() => {
    let element: any = document.getElementById("react-numeric-input");
    element.removeAttribute("style");
  }, []);

  return (
    <MintInputContainer>
      <MintNumericInput id="react-numeric-input" value={amount} readOnly />
      <MintInputActions>
        <MintInputStepIncrease
          onClick={() => amount < mintable && setAmount(amount + 1)}
        >
          +
        </MintInputStepIncrease>
        <MintInputStepDecrease
          onClick={() => amount > 0 && setAmount(amount - 1)}
        >
          -
        </MintInputStepDecrease>
      </MintInputActions>
    </MintInputContainer>
  );
};

export default MintInput;
