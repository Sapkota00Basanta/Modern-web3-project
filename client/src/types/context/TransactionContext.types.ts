export type ExampleType = {
  name: string;
  age: number;
};

export interface IExampleContextInterface {
  readonly example?: ExampleType | null;
  readonly setExample?: (example: ExampleType) => void;
  readonly getExample?: () => Promise<void>;
}
