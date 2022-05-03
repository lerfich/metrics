import React from "react";

import { SearchContextValue } from "../types";
import { SearchContext, DEFAULT_CONTEXT_VALUE } from "./SearchContext";

export type SearchContextProps = {
  children: React.ReactNode;
  defaultSortOption?: SearchContextValue["sortOption"];
  defaultDisplayList?: boolean;
  defaultFilterOption?: SearchContextValue["filter"];
};

export const SearchProvider = ({
  children,
  defaultSortOption = DEFAULT_CONTEXT_VALUE.sortOption,
  defaultDisplayList = true,
  defaultFilterOption = "All",
}: SearchContextProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isUserTyping, setIsUserTyping] = React.useState(false);
  const [sortOption, setSortOption] = React.useState(defaultSortOption);
  const [displayList, setDisplayList] = React.useState(defaultDisplayList);
  const [filter, setFilter] = React.useState(defaultFilterOption);
  const [dateFilter, setDateFilter] = React.useState(null);
  const [zipQuery, setZipQuery] = React.useState("");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isUserTyping,
        setIsUserTyping,
        displayList,
        sortOption,
        setSortOption,
        setDisplayList,
        filter,
        setFilter,
        dateFilter,
        setDateFilter,
        zipQuery,
        setZipQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
