import React from "react";

import { DATABASE } from "../shared/constants";
import { DatabaseContextValue } from "./types";

export const DEFAULT_CONTEXT_VALUE: DatabaseContextValue = {
  database: DATABASE,
  setDatabase: () => {},
};

export const DatabaseContext = React.createContext<DatabaseContextValue>(
  DEFAULT_CONTEXT_VALUE
);
