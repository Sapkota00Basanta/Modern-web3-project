/**
 * This consits of all the type defination for Transaction component.
 */
export interface ITransactionTypes {
  props?: any;
}

export type ITransactionCardType = {
  id?: number;
  url?: string;
  message?: string;
  amount: string;
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  keyword: string;
};
