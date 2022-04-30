import React from "react";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  ThemeOptions,
} from "@material-ui/core";
import * as R from "ramda";
import { customPallete } from "../../theme";

import { CustomThemeContext } from "./CustomThemeContext";

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentPalette, setCurrentPalette] =
    React.useState<any>(customPallete);
  const onChangeTheme = (colorSchema: any) => {
    if (!colorSchema) {
      return;
    }

    setCurrentPalette((prev: any) => ({
      ...prev,
      ...R.evolve({
        palette: (palette) =>
          R.evolve({
            primary: (data) => ({
              ...data,
              dark: colorSchema?.primary || data.dark,
              side: colorSchema?.sidebar || data.side,
              light: colorSchema?.secondary || data.light,
              icon: colorSchema?.accent2 || data.icon,
            }),
            secondary: (data) => ({
              ...data,
              light: colorSchema?.accent1 || data.light,
            }),
          })(palette),
      })(prev),
    }));
  };

  const theme = React.useMemo(() => {
    return createMuiTheme(currentPalette as ThemeOptions);
  }, [currentPalette]);

  return (
    <CustomThemeContext.Provider value={{ onChangeTheme }}>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
      </MuiThemeProvider>
    </CustomThemeContext.Provider>
  );
};
