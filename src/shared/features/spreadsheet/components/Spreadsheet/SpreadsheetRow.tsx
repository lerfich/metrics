import React from "react";
import { css } from "@emotion/react";
import { Checkbox, IconButton, TableCell, TableRow } from "@mui/material";

import { Icon } from "../../../../components/ui";
import {
  HeadlinesType,
  SpreadsheetCellActions,
  SpreadsheetDataType,
  SpreadsheetActionsPopover,
  actionCellCss,
  SpreadsheetCell,
  useSpreadsheetContext,
} from "../../";

import { useHistory } from "react-router-dom";
import { APP_URL } from "shared/components/navigation/constants";
import { buildUrl } from "shared/routes/routerUtils";

const rowCss = css`
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 15px 0 #ebebeb;
  }
`;

const cellCss = css`
  border-color: rgba(224, 224, 224, 1);
`;

const cellIndexCss = (theme: any) => css`
  border-right: 1px solid ${theme.palette.border};
  border-color: ${theme.palette.border};
  font-weight: 500;
`;

type SpreadsheetRowProps<T extends HeadlinesType> = {
  rowData: SpreadsheetDataType<T>;
  isSelected?: boolean;
  headlines: T;
  cellActions?: SpreadsheetCellActions;
  onSelect: () => void;
  withCheckbox?: boolean;
  withIndex?: boolean;
  index: number;
  howManySelected: number;
  shouldRedirect?: boolean;
};

export const SpreadsheetRow = <T extends HeadlinesType>({
  rowData,
  isSelected,
  headlines,
  cellActions,
  onSelect,
  withCheckbox = true,
  withIndex = true,
  index,
  howManySelected,
  shouldRedirect,
}: SpreadsheetRowProps<T>) => {
  const { setCurrentRowId } = useSpreadsheetContext();
  const history = useHistory();

  const onRowClick = React.useCallback(() => {
    setCurrentRowId(rowData.id);
    const url = buildUrl(APP_URL.actualCase, {
      pathParams: { id: rowData.id },
    });
    shouldRedirect && history.push(url);
  }, [history, rowData.id, setCurrentRowId]);

  const actionsPopover = (
    <SpreadsheetActionsPopover
      cellActions={cellActions}
      id={rowData.id}
      target={
        <IconButton style={{ padding: 4 }}>
          <Icon name="MoreVert" />
        </IconButton>
      }
    />
  );

  return (
    <TableRow css={rowCss} onClick={onRowClick}>
      {withCheckbox && (
        <TableCell css={cellCss} padding="checkbox">
          <Checkbox
            color="secondary"
            checked={isSelected}
            onChange={onSelect}
          />
        </TableCell>
      )}

      {withIndex && (
        <TableCell css={cellIndexCss} align="center">
          {index + 1}
        </TableCell>
      )}

      {headlines.map(({ id, name, isNumeric }) => (
        <SpreadsheetCell key={id} value={rowData[name]} isNumeric={isNumeric} />
      ))}

      {!!cellActions?.length && (
        <TableCell align="center" css={actionCellCss}>
          {howManySelected > 0 ? isSelected && actionsPopover : actionsPopover}
        </TableCell>
      )}
    </TableRow>
  );
};
