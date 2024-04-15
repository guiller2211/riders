import type { ReactNode } from 'react';

export type TableProps = {
  fieldNames: string[];
  showSearcher?: boolean;
  children: ReactNode;
  searchTerm: (search: string) => void;
  open: (value: boolean) => void;
};
