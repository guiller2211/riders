export type PaginationProps = {
  totalItems: number;
  numPage: (value: number) => void;
  itemPerPage: number;
  showInput: boolean;
};
