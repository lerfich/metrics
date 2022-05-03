import React from "react";
import { SORT } from "../../../constants";

import { SearchContextValue } from "../types";

export const DEFAULT_CONTEXT_VALUE: SearchContextValue = {
  searchQuery: "",
  setSearchQuery: () => {},
  isUserTyping: false,
  setIsUserTyping: () => {},
  displayList: true,
  setSortOption: () => {},
  setDisplayList: () => {},
  sortOption: {
    createdAt: "DESC",
  },
  filter: "All",
  setFilter: () => {},
  dateFilter: null,
  setDateFilter: () => {},
  zipQuery: "",
  setZipQuery: () => {},
};

export const SearchContext = React.createContext<SearchContextValue>(
  DEFAULT_CONTEXT_VALUE
);
