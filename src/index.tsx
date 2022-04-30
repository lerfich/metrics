import React from "react";
import ReactDOM from "react-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { App } from "./App";
import { CustomThemeProvider } from "./providers/CustomThemeProvider";

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
