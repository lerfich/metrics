import React from "react";

import { MenuItem } from "@material-ui/core";

import { Select, SelectProps } from "../Select";
import { SortOrder } from "../../../types/sort";

export type SortInfoOption = {
  [fieldName: string]: SortInfoOption | SortOrder | undefined;
};

export type SortInfoFieldOption = {
  label: string;
  value: SortInfoOption | any;
};

export type SortInfoFieldProps = {
  activeSortOption: SortInfoOption;
  setSortOption: (activeSortOption: SortInfoOption) => void;
  sortInfo?: {
    displayName: string;
    options: SortInfoFieldOption[];
  };
} & SelectProps;

export const SortInfoField = ({
  activeSortOption,
  setSortOption,
  sortInfo,
  ...rest
}: SortInfoFieldProps) => {
  const switchSortOption = React.useCallback(
    (event: any) => {
      setSortOption(JSON.parse(event.target.value));
    },
    [setSortOption]
  );

  const renderSortOptions = React.useCallback(() => {
    return sortInfo?.options?.map(({ value, label }) => {
      return (
        <MenuItem key={label} value={JSON.stringify(value)}>
          {label}
        </MenuItem>
      );
    });
  }, [sortInfo?.options]);

  return (
    <Select
      variant="outlined"
      label={sortInfo?.displayName}
      value={JSON.stringify(activeSortOption)}
      onChange={switchSortOption}
      {...rest}
    >
      {renderSortOptions()}
    </Select>
  );
};
