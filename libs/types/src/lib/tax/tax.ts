export interface TaxRate {
  name: string;
  amount: number;
  includedInPrice: boolean;
  country: string;
  state?: string;
  id?: string;
  key?: string;
}

export interface TaxCategory {
  typeId: string;
  id: string;
}
