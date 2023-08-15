import { ChangeEvent, ChangeEventHandler } from "react";
import { IFormDataHandleChangeProps } from "../context/TransactionContext.types";

/**
 * This consists of all the type defination for Welcome page.
 */
export interface IWelcomeTypes {
  props?: any;
}

export interface IWelcomeInputTypes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleChange: ({ event, name }: IFormDataHandleChangeProps) => void;
}
