import React from 'react';
import { FilterAlt as FilterIcon } from '@mui/icons-material';

import { PopoverV2 } from 'shared/components/ui';
import { SpreadsheetFiltersType, SpreadsheetFilterContent } from 'shared/features/spreadsheet';

export type SpreadsheetFilterPopoverProps = {
  filters: SpreadsheetFiltersType;
};

export const SpreadsheetFilterPopover: React.FC<SpreadsheetFilterPopoverProps> = ({ filters }) => {
  return (
    <PopoverV2
      triggerType="icon-button"
      tripperProps={{ children: <FilterIcon /> }}
      popoverProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      }}
    >
      {({ handlePopoverClose }) => (
        <SpreadsheetFilterContent filters={filters} handlePopoverClose={handlePopoverClose} />
      )}
    </PopoverV2>
  );
};
