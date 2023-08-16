import { ReactNode } from "react";

/**
 * This consists of all the type defination for service component.
 */
export interface IServicesTypes {
  props?: any;
}

export type IServicesCardTypes = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  color: string;
};
