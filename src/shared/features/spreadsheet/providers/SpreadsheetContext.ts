import React from "react";

import { SORT } from "../../../constants";

import {
  SpreadsheetContextValue,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../spreadsheet";

export const DEFAULT_CONTEXT_VALUE: SpreadsheetContextValue = {
  page: DEFAULT_PAGE,
  setPage: () => {},
  filter: { query: {}, fields: {} },
  setFilter: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  setPageSize: () => {},
  sortOption: {
    // sort: { createdAt: SORT.desc },
    headcellId: "createdAt",
    order: "DESC",
  },
  // sortOption: "ASC",
  setSortOption: () => {},
  queryParams: {
    filter: {},
    skip: 0,
    first: DEFAULT_PAGE_SIZE,
    // sort: {},
  },
  currentRowId: "",
  setCurrentRowId: () => {},
  selected: [],
  setSelected: () => {},
  customFilter: { query: {}, fields: {} },
  setCustomFilter: () => {},
  zip: { startPointZip: "", radius: "-" },
  setZip: () => {},
};

export const SpreadsheetContext = React.createContext<SpreadsheetContextValue>(
  DEFAULT_CONTEXT_VALUE
);
