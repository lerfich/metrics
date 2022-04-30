import React from "react";

import { SortInfoField, SortInfoFieldProps } from "../../../../components/ui";

import { useSearchContext } from "../../providers/useSearchContext";

export type SortFieldProps = Pick<SortInfoFieldProps, "sortInfo">;

export const SortField: React.FC<SortFieldProps> = ({ sortInfo }) => {
  const { sortOption, setSortOption } = useSearchContext();

  return (
    <SortInfoField
      activeSortOption={sortOption}
      setSortOption={setSortOption}
      sortInfo={sortInfo}
    />
  );
};
