import React from "react";
import ReactDOM from "react-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { App } from "./App";
import { CustomThemeProvider } from "./providers/CustomThemeProvider";
import { SnackbarProvider } from "notistack";
import { DatabaseProvider } from "providers/DatabaseProvider";

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <SnackbarProvider maxSnack={3}>
          <DatabaseProvider>
            <App />
          </DatabaseProvider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
