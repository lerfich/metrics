import React from "react";
import { TableCell } from "@material-ui/core";

import { Typography } from "../../../../components/ui";
import { SpreadsheetCellType } from "../../";

type SpreadsheetCellProps = {
  value: SpreadsheetCellType;
  isNumeric?: boolean;
};

export const SpreadsheetCellRaw = ({
  value,
  isNumeric,
}: SpreadsheetCellProps) => {
  if (typeof value === "string") {
    return (
      <TableCell align={isNumeric ? "right" : "left"}>
        <Typography variant="body2">{value}</Typography>
      </TableCell>
    );
  }

  return <TableCell>{value}</TableCell>;
};

export const SpreadsheetCell = React.memo(SpreadsheetCellRaw);
