import React from 'react';

import { CustomThemeContext } from './CustomThemeContext';

export const useCustomTheme = () => {
  return React.useContext(CustomThemeContext);
};
