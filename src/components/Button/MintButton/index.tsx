import React from "react";
import { Oval } from "react-loader-spinner";
import { MintButtonAction } from "./styled";

import { MintButtonProps } from "types/Button";

const MintButton: React.FC<MintButtonProps> = (props) => {
  return props.currentAcc ? (
    props.status === 2 || (props.isList && props.status === 1) ? (
      props.mintable === 0 ? (
        <MintButtonAction disabled>{"Minted Max"}</MintButtonAction>
      ) : (
        <MintButtonAction onClick={props.mint}>
          {props.loading ? (
            <Oval color="#00BFFF" height={30} width={30} />
          ) : (
            "Mint"
          )}
        </MintButtonAction>
      )
    ) : (
      <MintButtonAction disabled>{"Not Whitelisted"}</MintButtonAction>
    )
  ) : (
    <MintButtonAction onClick={props.connect}>
      {"Connect Wallet"}
    </MintButtonAction>
  );
};

export default MintButton;
