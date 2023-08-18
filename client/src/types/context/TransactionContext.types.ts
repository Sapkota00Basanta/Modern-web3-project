// export type ExampleType = {
//   name: string;
//   age: number;
// };

// export interface IExampleContextInterface {
// readonly example?: ExampleType | null;
// readonly setExample?: (example: ExampleType) => void;
// readonly getExample?: () => Promise<void>;
// }

import { ChangeEvent } from "react";
export interface ITransactionContextTypes {
  connectWallet: () => Promise<any>;
  currentAccount: string;
  formData: IFormDataTypes;
  // setFormData: Dispatch<SetStateAction<IFormDataTypes>>;
  sendTransaction: () => Promise<any | null | void>;
  formDataHandleChange: ({ event, name }: IFormDataHandleChangeProps) => void;
  transactions: Array<IFormattedTranasctionTypes>;
  isLoading: boolean;
}

export type IFormDataTypes = {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
};

export type IFormDataHandleChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
  name: string;
};

export type IFormattedTranasctionTypes = {
  addressFrom: string;
  addressTo: string;
  amount: string;
  timestamp: string;
  message: string;
  keyword: string;
  url: string;
};

export type IBlockchainTransactionTypes = {
  receiver: string;
  sender: string;
  amount: string;
  timestamp: string;
  message: string;
  keyword: string;
};
