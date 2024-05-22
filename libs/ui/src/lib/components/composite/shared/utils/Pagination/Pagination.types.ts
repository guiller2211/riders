export type PaginationProps = {
  totalItems: number;
  numPage: (value: number) => void;
  itemsPerPage: number;
  hideSearch?: boolean;
  hideButton?: boolean;
  currentPage?: number
};
