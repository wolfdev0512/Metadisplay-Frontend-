export type MintButtonProps = {
  loading: boolean;
  currentAcc: string;
  mintable: number;
  status: number;
  isList: boolean;
  connect: () => void;
  mint: () => void;
};
