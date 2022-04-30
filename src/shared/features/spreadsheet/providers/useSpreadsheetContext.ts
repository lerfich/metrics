import React from 'react';

import { SpreadsheetContext } from './SpreadsheetContext';

export const useSpreadsheetContext = () => {
  const context = React.useContext(SpreadsheetContext);

  return context;
};
