/**
 * This consists of all the type defination for Welcome page.
 */
export interface IWelcomeTypes {
  props?: any;
}

export interface IWelcomeInputTypes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
}
