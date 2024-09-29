import type { ReactNode } from 'react';

export type TableProps = {
  fieldNames?: string[];
  nameSpace: string;
  showSearcher?: boolean;
  children: ReactNode;
  searchTerm: (search: string) => void;
};
