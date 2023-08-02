type StandardType = "range" | "fixed";

export interface IStandard {
  key: string;
  standardType: StandardType;
  min?: string;
  max?: string;
  value?: string;
  unit?: string;
  score: number;
  weight?: number;
}
