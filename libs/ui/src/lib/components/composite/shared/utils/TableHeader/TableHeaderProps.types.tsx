export type TableHeaderProps = {
  fieldNames: string[];
  nameSpace: string;
  showSearcher?: boolean;
  searchTerm: (search: string) => void;
};
