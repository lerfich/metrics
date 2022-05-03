import React from 'react';
import { Box, Typography } from '@mui/material';

interface SpreadsheetEmptyProps {
  columnsCount: number;
}

export const SpreadsheetEmpty: React.FC<SpreadsheetEmptyProps> = ({ columnsCount }) => {
  return (
    <tr>
      <td colSpan={columnsCount}>
        <Box
          sx={{ width: '100%', height: 450 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography color="GrayText">NO DATA</Typography>
        </Box>
      </td>
    </tr>
  );
};
