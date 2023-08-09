type StandardType = "range" | "fixed";
export type TradeMethodType = "direct" | "delivery";

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

interface ICategory {
  id: number;
  category: string;
  name: string;
}

export interface IMiddleCategory extends ICategory {
  mainCategoryId: number;
}
export interface IMainCategory extends ICategory {
  middleCategory: IMiddleCategory[];
}
