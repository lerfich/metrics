import React from "react";
import { css } from "@emotion/react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

import { Typography } from "../../../../components/ui";
import {
  DEFAULT_CONTEXT_VALUE,
  HeadlinesType,
  HeadlineType,
  useSpreadsheetContext,
} from "../../";
import { SORT } from "../../../../constants";
import { SortOrder } from "../../../../types/sort";

const labelTypographyCss = css`
  font-weight: 500;
  white-space: nowrap;
`;

const headerTitlesCss = (theme: any) => css`
  background-color: ${theme.palette.borderGrey};
`;

type SpreadsheetHeaderProps = {
  headlines: HeadlinesType;
  withActions?: boolean;
  withCheckbox?: boolean;
  withIndex?: boolean;
};

export const SpreadsheetHeader = ({
  headlines,
  withActions,
  withCheckbox = true,
  withIndex = true,
}: SpreadsheetHeaderProps) => {
  const { setSortOption, sortOption } = useSpreadsheetContext();

  const createSortHandler = React.useCallback(
    ({ id, sortPath: differentPath }: HeadlineType) =>
      () => {
        const isSameHeadcell = sortOption.headcellId === id;

        // drop sort do default
        if (isSameHeadcell && sortOption.order === SORT.asc) {
          setSortOption(DEFAULT_CONTEXT_VALUE.sortOption);
          return;
        }

        const newSortOrder: SortOrder = isSameHeadcell ? "ASC" : "DESC";

        const newSortOption = {
          order: newSortOrder,
          headcellId: id,
          // sort: differentPath?.(newSortOrder) || { [id]: newSortOrder },
        };

        setSortOption(newSortOption);
      },
    [setSortOption, sortOption.headcellId, sortOption.order]
  );

  return (
    <TableHead>
      <TableRow>
        {withCheckbox && <TableCell />}
        {withIndex && <TableCell css={headerTitlesCss} />}
        {headlines.map((headCell) => {
          const { order } = sortOption;
          const direction = order === SORT.asc ? "asc" : "desc";
          const isActiveSort = headCell.id === sortOption.headcellId;

          return (
            <TableCell key={headCell.name} css={withIndex && headerTitlesCss}>
              {headCell.withoutSort ? (
                <Typography variant="body2" css={labelTypographyCss}>
                  {headCell.label}
                </Typography>
              ) : (
                <TableSortLabel
                  active={isActiveSort}
                  direction={direction}
                  onClick={createSortHandler(headCell)}
                  style={{ textTransform: "uppercase" }}
                >
                  <Typography variant="body2" css={labelTypographyCss}>
                    {headCell.label}
                  </Typography>
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
        {withActions && (
          <TableCell align="center" css={actionCellCss}>
            <Typography variant="body2" css={labelTypographyCss}>
              ACTIONS
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export const actionCellCss = css`
  border-left: 1px solid #e0e0e0;
  border-bottom-color: rgba(224, 224, 224, 1);
`;
