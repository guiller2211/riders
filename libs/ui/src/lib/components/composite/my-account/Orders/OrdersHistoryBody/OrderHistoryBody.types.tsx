import { OrderData } from "../../../../../types";

export type OrdersHistoryBodyProps = {
  orders?: OrderData[];
  searchTerm: string;
};
