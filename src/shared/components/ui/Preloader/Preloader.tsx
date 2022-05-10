import React from 'react';
import { Box, BoxProps, CircularProgress, CircularProgressProps } from '@mui/material';

interface PreloaderProps {
  height?: number | string;
  boxProps?: BoxProps;
  circularProgressProps?: CircularProgressProps;
}

export const Preloader: React.FC<PreloaderProps> = ({
  height,
  boxProps,
  circularProgressProps,
}) => {
  return (
    <Box
      sx={{ height }}
      padding={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...boxProps}
    >
      <CircularProgress size={64} {...circularProgressProps} />
    </Box>
  );
};
