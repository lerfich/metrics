import React from "react";
import { Box, css } from "@mui/material";
import _ from "lodash";

import { LayoutControl } from "../LayoutControl";
import { SearchTextField, SearchTextFieldProps } from "../SearchTextField";
import { SortField, SortFieldProps } from "../SortField";

export type SearchControlSortProps =
  | {
      withSortField: true;
      sortFieldProps: SortFieldProps;
    }
  | {
      withSortField?: false;
      sortFieldProps?: SortFieldProps;
    };

const containerCss = (
  itemsCount: number,
  elementsWidth: string[],
  elementsGap: string | number
) => css`
  display: grid;
  grid-template-columns: ${_.isEmpty(elementsWidth)
    ? `repeat(${itemsCount}, 1fr)`
    : `${elementsWidth.join(" ")}`};
  gap: ${_.isNumber(elementsGap) ? `${elementsGap}px` : elementsGap};
`;

export type SearchControlProps = {
  withTextField?: boolean;
  textFieldProps?: SearchTextFieldProps;
  withLayoutControl?: boolean;
  elementsWidth?: string[];
  elementsGap?: number | string;
} & SearchControlSortProps;

export const SearchControl: React.FC<SearchControlProps> = ({
  withTextField = true,
  textFieldProps,
  withSortField = false,
  sortFieldProps,
  withLayoutControl = false,
  elementsWidth = [],
  elementsGap = 10,
}) => {
  const itemsCount = [withTextField, withSortField, withLayoutControl].filter(
    Boolean
  ).length;

  return (
    <Box
      display="flex"
      css={containerCss(itemsCount, elementsWidth, elementsGap)}
    >
      {withTextField && <SearchTextField {...textFieldProps} />}
      {withSortField && sortFieldProps?.sortInfo && (
        <SortField {...sortFieldProps} />
      )}
      {withLayoutControl && <LayoutControl />}
    </Box>
  );
};
