import React from 'react';

import { SortInfoOption } from 'shared/components/ui';

export type SearchContextValue = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isUserTyping: boolean;
  setIsUserTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setSortOption: React.Dispatch<React.SetStateAction<SortInfoOption>>;
  sortOption: SortInfoOption;
  displayList: boolean;
  setDisplayList: React.Dispatch<React.SetStateAction<boolean>>;
  filter: string | any;
  setFilter: React.Dispatch<React.SetStateAction<string>> | any;
  dateFilter: any;
  setDateFilter: React.Dispatch<React.SetStateAction<any>>;
  zipQuery: string;
  setZipQuery: React.Dispatch<React.SetStateAction<string>>;
};
