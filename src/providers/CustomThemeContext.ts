import React from 'react';

export type CustomThemeContextValue = {
  onChangeTheme?: any;
};

export const CustomThemeContext = React.createContext<CustomThemeContextValue>({});
