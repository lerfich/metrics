import React from "react";
import { css } from "@emotion/react";
import {
  BoxProps,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";
import { Divider } from "@material-ui/core";

import {
  HeadlinesType,
  SpreadsheetDataType,
  SpreadsheetCellActions,
  SpreadsheetFiltersType,
  MainToolbarActionType,
  useSpreadsheetContext,
  SpreadsheetRow,
  SpreadsheetToolbar,
  SpreadsheetHeader,
  SpreadsheetPagination,
} from "../../../spreadsheet";

import { SpreadsheetPreloader } from "./SpreadsheetPreloader";
import { SpreadsheetEmpty } from "./SpreadsheetEmpty";

const tableFooterCss = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const dividerCss = (theme: any) => css`
  background-color: ${theme.palette.border};
  margin-bottom: ${theme.spacing(5)}px;
`;

export type SpreadsheetProps<T extends HeadlinesType> = {
  headlines: T;
  data: SpreadsheetDataType<T>[];
  cellActions?: SpreadsheetCellActions;
  containerProps?: BoxProps;
  itemsCount: number;
  loading?: boolean;
  toolbarOptions?: {
    mainToolbarAction?: MainToolbarActionType;
    filters?: SpreadsheetFiltersType;
    withDownload?: boolean;
    withSearch?: boolean;
    withPerPage?: boolean;
    withIndex?: boolean;
    downloadHandler?: (rawData?: any) => void;
    rawData?: any;
  };
  toolbarHeader?: JSX.Element;
  toolbarHeaderWidth?: string;
};

/**
 * Use useSpreadsheetContext with this component
 * Use useSpreadsheetSearch for search
 * All headlines fields must be in data
 * In data fields 'id' and 'createdAt' is required
 */

export const Spreadsheet = <T extends HeadlinesType>({
  headlines,
  data,
  cellActions,
  containerProps,
  loading,
  toolbarOptions,
  itemsCount,
  toolbarHeader,
  toolbarHeaderWidth,
}: SpreadsheetProps<T>) => {
  const { filter, sortOption, page, pageSize, selected, setSelected } =
    useSpreadsheetContext();

  React.useEffect(() => {
    setSelected([]);
  }, [filter, sortOption]);

  const onSelect = React.useCallback(
    (id: string) => () => {
      setSelected((currentSelected) => {
        const isSelected = currentSelected.includes(id);
        if (isSelected) {
          return currentSelected.filter((selectedId) => selectedId !== id);
        }

        return [...currentSelected, id];
      });
    },
    []
  );

  const onSelectAll = React.useCallback(() => {
    setSelected((currentSelected) => {
      const dataIds = data.map((row) => row.id);
      if (currentSelected.some((id) => dataIds.includes(id))) {
        return currentSelected.filter((id) => !dataIds.includes(id));
      }

      return [...currentSelected, ...data.map((row) => row.id)];
    });
  }, [data]);

  const onClickMainAction = React.useCallback(() => {
    const onClick = toolbarOptions?.mainToolbarAction?.onClick;

    onClick && onClick(selected);
  }, [selected, toolbarOptions]);

  const tableContent = React.useMemo(() => {
    const columnsCount = headlines.length + (cellActions?.length === 0 ? 1 : 2);

    if (loading) {
      return <SpreadsheetPreloader columnsCount={columnsCount} />;
    }

    if (data.length === 0) {
      return <SpreadsheetEmpty columnsCount={columnsCount} />;
    }

    return (
      <React.Fragment>
        {data.map((row, index) => {
          const isSelected = selected.some(
            (selectedId) => selectedId === row.id
          );
          return (
            <SpreadsheetRow
              withCheckbox={!!toolbarOptions?.mainToolbarAction}
              rowData={row}
              cellActions={cellActions}
              headlines={headlines}
              key={row.id}
              isSelected={isSelected}
              onSelect={onSelect(row.id)}
              withIndex={!!toolbarOptions?.withIndex}
              index={index + (page - 1) * pageSize}
              howManySelected={selected.length}
            />
          );
        })}
      </React.Fragment>
    );
  }, [
    cellActions,
    data,
    headlines,
    loading,
    onSelect,
    page,
    pageSize,
    selected,
    toolbarOptions?.mainToolbarAction,
    toolbarOptions?.withIndex,
  ]);

  return (
    <Box width="100%" {...containerProps}>
      <Paper>
        <TableContainer>
          <SpreadsheetToolbar
            toolbarOptions={toolbarOptions}
            onSelectAll={onSelectAll}
            isRowsSelected={
              !!selected.some((id) => data.some((row) => row.id === id))
            }
            onClickMainAction={onClickMainAction}
            toolbarHeader={toolbarHeader}
            toolbarHeaderWidth={toolbarHeaderWidth}
          />

          {toolbarOptions?.withIndex && <Divider css={dividerCss} />}

          <Box overflow="auto">
            <Table>
              <SpreadsheetHeader
                headlines={headlines}
                withActions={!!cellActions?.length}
                withCheckbox={!!toolbarOptions?.mainToolbarAction}
                withIndex={!!toolbarOptions?.withIndex}
              />

              <TableBody>{tableContent}</TableBody>
            </Table>
          </Box>
          {toolbarOptions?.withPerPage && (
            <Box css={tableFooterCss}>
              <SpreadsheetPagination itemsCount={itemsCount} />
            </Box>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
};
