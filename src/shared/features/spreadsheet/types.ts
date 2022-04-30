import React from "react";
import { SortOrder } from "../../types/sort";

export type SortInfoOption = {
  [x: string]: SortInfoOption | SortOrder;
};

export type FilterType = {
  [x: string]:
    | FilterType
    | string
    | FilterType[]
    | boolean
    | number
    | undefined;
};

export type SpreadsheetContextValue = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  filter: {
    query: FilterType;
    fields: { [x: string]: string };
  };
  setFilter: React.Dispatch<
    React.SetStateAction<SpreadsheetContextValue["filter"]>
  >;
  sortOption: {
    // sort: SortInfoOption;
    order: SortOrder;
    headcellId: string;
  };
  setSortOption: React.Dispatch<
    React.SetStateAction<SpreadsheetContextValue["sortOption"]>
  >;
  queryParams: {
    filter: FilterType;
    // sort: SortInfoOption;
    first: number;
    skip: number;
  };
  currentRowId: string;
  setCurrentRowId: React.Dispatch<React.SetStateAction<string>>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  customFilter: {
    query: FilterType;
    fields: { [x: string]: string };
  };
  setCustomFilter: React.Dispatch<
    React.SetStateAction<SpreadsheetContextValue["customFilter"]>
  >;
  zip: { startPointZip: string; radius: string };
  setZip: React.Dispatch<
    React.SetStateAction<{ startPointZip: string; radius: string }>
  >;
};

export type SpreadsheetCellAction = {
  id: string;
  title: string;
  icon: JSX.Element;
  confirm?: {
    text: string;
    confirmText?: string;
    description?: string;
    cancelText?: string;
    await?: boolean;
  };
  onClickAction: (props?: any) => Promise<void> | void;
  checkHidden?: (id: string) => boolean;
};
export type SpreadsheetCellActions = SpreadsheetCellAction[];

export type SpreadsheetCellType = string | JSX.Element | undefined | null;

export type HeadlineType = {
  readonly name: string;
  readonly label: string;
  readonly isNumeric?: boolean;
  readonly id: string;
  readonly sortPath?: (value: SortOrder) => SortInfoOption;
  readonly withoutSort?: boolean;
};

export type HeadlinesType = readonly HeadlineType[];

export type SpreadsheetDataType<T extends HeadlinesType> = Record<
  HeadlinesType[number]["name"],
  SpreadsheetCellType
> & { id: string };

type FilterBaseType = {
  label: string;
  placeholder?: string;
  name: string;
  size?: "small" | "full";
  filterPath?: (value: string) => FilterType;
  customFilterPath?: (value: string) => FilterType;
};

type FilterSelectType = {
  type: "select";
  variants: { value: string | number | boolean; text?: string }[];
} & FilterBaseType;

type FilterInputType = {
  type: "input";
} & FilterBaseType;

type SpreadsheetFilterType = FilterSelectType | FilterInputType;
export type SpreadsheetFiltersType = SpreadsheetFilterType[];

export type MainToolbarActionType = {
  icon: JSX.Element;
  label: string;
  onClick: (ids: string[]) => void;
};
