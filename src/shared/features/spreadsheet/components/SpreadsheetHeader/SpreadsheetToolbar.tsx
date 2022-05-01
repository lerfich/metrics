import React from "react";
import { css } from "@emotion/react";
import {
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
} from "@material-ui/core";

import {
  Box,
  Icon,
  Typography,
  Select,
  PopoverV2,
} from "../../../../components/ui";
import { SearchControl } from "../../../search";
import {
  MainToolbarActionType,
  SpreadsheetFilterPopover,
  SpreadsheetFiltersType,
  TABLE_PAGE_SIZE_VARIANTS,
  useSpreadsheetContext,
} from "../../";

type SpreadsheetToolbarProps = {
  filters?: SpreadsheetFiltersType;
  onSelectAll: () => void;
  isRowsSelected: boolean;
  toolbarOptions?: {
    mainToolbarAction?: MainToolbarActionType;
    filters?: SpreadsheetFiltersType;
    withDownload?: boolean;
    withSearch?: boolean;
    withPerPage?: boolean;
    downloadHandler?: (rawData: AnalyserNode) => void;
    rawData?: any;
    showTotalCount?: boolean;
  };
  onClickMainAction: () => void;
  toolbarHeader?: JSX.Element;
  toolbarHeaderWidth?: string;
  totalCount?: number;
};

export const SpreadsheetToolbar: React.FC<SpreadsheetToolbarProps> = ({
  onSelectAll,
  isRowsSelected,
  onClickMainAction,
  toolbarOptions,
  toolbarHeader,
  toolbarHeaderWidth,
  totalCount,
}) => {
  const { setPageSize, pageSize } = useSpreadsheetContext();

  const onChangePageSize = React.useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      setPageSize(Number(event.target.value));
    },
    [setPageSize]
  );

  const isMainAction = !!toolbarOptions?.mainToolbarAction;
  return (
    <Box>
      <TableRow>
        {toolbarOptions?.showTotalCount && (
          <TableCell css={totalCountCss} align="center">
            Записей найдено: {totalCount}
          </TableCell>
        )}
        {toolbarHeader && (
          <TableCell css={tableToolbarHeaderCss(toolbarHeaderWidth)}>
            {toolbarHeader}
          </TableCell>
        )}
        <TableCell css={tableCellCheckboxCss} padding="checkbox">
          {isMainAction && (
            <Checkbox
              color="secondary"
              checked={isRowsSelected}
              onChange={onSelectAll}
            />
          )}
        </TableCell>
        <TableCell css={tableCellMainActionCss}>
          <Box
            display="flex"
            justifyContent={isMainAction ? "space-between" : "flex-end"}
          >
            {isMainAction && (
              <Box display="flex" alignItems="center">
                {toolbarOptions?.mainToolbarAction?.icon && (
                  <IconButton
                    onClick={onClickMainAction}
                    disableRipple={true}
                    css={{ backgroundColor: "transparent !important" }}
                  >
                    {toolbarOptions?.mainToolbarAction?.icon}
                  </IconButton>
                )}
                <Typography>
                  {toolbarOptions?.mainToolbarAction?.label}
                </Typography>
              </Box>
            )}
            <Box display="flex" alignItems="center">
              {toolbarOptions?.withPerPage && (
                <Box display="flex" alignItems="center">
                  <Typography
                    style={{
                      marginRight: 10,
                      fontFamily: "Barlow",
                      letterSpacing: "0.7px",
                      color: "#9A9A9A",
                      fontSize: "11px",
                    }}
                  >
                    RESULTS PER PAGE
                  </Typography>
                  <Select
                    size="small"
                    style={{
                      height: "36px",
                      width: "74px",
                    }}
                    variant="outlined"
                    value={pageSize}
                    onChange={onChangePageSize}
                  >
                    {TABLE_PAGE_SIZE_VARIANTS.map((el) => (
                      <MenuItem key={el} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
              <Box display="flex">
                {toolbarOptions?.withSearch !== false && (
                  <PopoverV2
                    triggerType="icon-button"
                    tripperProps={{ children: <Icon name="Search" /> }}
                    popoverProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "right",
                      },
                    }}
                  >
                    <SearchControl withTextField />
                  </PopoverV2>
                )}
                {!!toolbarOptions?.filters && (
                  <SpreadsheetFilterPopover filters={toolbarOptions.filters} />
                )}
                {toolbarOptions?.withDownload && (
                  <IconButton
                    onClick={() =>
                      toolbarOptions?.downloadHandler?.(
                        toolbarOptions?.rawData
                      ) || {}
                    }
                  >
                    <Icon name="Download" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </Box>
  );
};

const totalCountCss = (theme: any) => css`
  background-color: ${theme.palette.borderlight};
  width: 50%;
  margin-left: 10%;
  align-items: center;
  justify-content: center;
`;

const tableCellCheckboxCss = css`
  border: none;
`;
const tableToolbarHeaderCss = (toolbarHeaderWidth?: string) => css`
  border: none;
  width: ${toolbarHeaderWidth ?? "70%"};
`;

const tableCellMainActionCss = css`
  width: 100%;
  flex: 1;
  border: none;
`;
