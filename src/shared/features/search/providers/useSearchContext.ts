import React from 'react';

import { SearchContext } from './SearchContext';

export const useSearchContext = () => {
  const context = React.useContext(SearchContext);

  return context;
};
