import React from "react";

import {
  SpreadsheetContextValue,
  SpreadsheetContext,
  DEFAULT_CONTEXT_VALUE,
} from "../";

export type SearchContextProps = {
  children: React.ReactNode;
  defaultSortOption?: SpreadsheetContextValue["sortOption"];
  defaultPageSize?: SpreadsheetContextValue["pageSize"];
  defaultFilters?: SpreadsheetContextValue["filter"];
  defaultPage?: SpreadsheetContextValue["page"];
  defaultCurrentRowId?: SpreadsheetContextValue["currentRowId"];
  defaultSelected?: SpreadsheetContextValue["selected"];
  defaultCustomFilter?: SpreadsheetContextValue["filter"];
  defaultZip?: SpreadsheetContextValue["zip"];
};

export const SpreadsheetProvider = ({
  children,
  defaultSortOption = DEFAULT_CONTEXT_VALUE.sortOption,
  defaultPageSize = DEFAULT_CONTEXT_VALUE.pageSize,
  defaultFilters = DEFAULT_CONTEXT_VALUE.filter,
  defaultPage = DEFAULT_CONTEXT_VALUE.page,
  defaultCurrentRowId = DEFAULT_CONTEXT_VALUE.currentRowId,
  defaultSelected = DEFAULT_CONTEXT_VALUE.selected,
  defaultCustomFilter = DEFAULT_CONTEXT_VALUE.customFilter,
  defaultZip = DEFAULT_CONTEXT_VALUE.zip,
}: SearchContextProps) => {
  const [sortOption, setSortOption] = React.useState(defaultSortOption);
  const [page, setPage] = React.useState(defaultPage);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const [filter, setFilter] = React.useState(defaultFilters);
  const [currentRowId, setCurrentRowId] = React.useState(defaultCurrentRowId);
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [customFilter, setCustomFilter] = React.useState(defaultCustomFilter);
  const [zip, setZip] = React.useState(defaultZip);

  const queryParams = React.useMemo(
    () => ({
      filter: filter.query,
      ...customFilter.query,
      // sort: sortOption.sort,
      first: pageSize,
      skip: pageSize * (page - 1),
    }),
    [filter.query, customFilter, pageSize, page]
  );

  return (
    <SpreadsheetContext.Provider
      value={{
        sortOption,
        setSortOption,
        page,
        setPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        queryParams,
        currentRowId,
        setCurrentRowId,
        selected,
        setSelected,
        customFilter,
        setCustomFilter,
        zip,
        setZip,
      }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
};
