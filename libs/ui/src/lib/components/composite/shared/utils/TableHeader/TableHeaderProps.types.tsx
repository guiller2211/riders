export type TableHeaderProps = {
  fieldNames: string[];
  showSearcher?: boolean;
  searchTerm: (search: string) => void;
  open: (value: boolean) => void;
};
