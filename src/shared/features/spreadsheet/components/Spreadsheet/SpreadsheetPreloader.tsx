import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface SpreadsheetPreloaderProps {
  columnsCount: number;
}

export const SpreadsheetPreloader: React.FC<SpreadsheetPreloaderProps> = ({ columnsCount }) => {
  return (
    <tr>
      <td colSpan={columnsCount}>
        <Box
          sx={{ width: '100%', height: 250 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      </td>
    </tr>
  );
};
