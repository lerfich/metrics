import React from "react";

import { DATABASE } from "../shared/constants";
import { DatabaseContextValue } from "./types";

export type DatabaseContextProps = {
  database: DatabaseContextValue;
  setDatabase: React.Dispatch<React.SetStateAction<DatabaseContextValue>>;
};

export const DEFAULT_CONTEXT_VALUE: DatabaseContextProps = {
  database: DATABASE,
  setDatabase: () => {},
};

export const DatabaseContext = React.createContext<DatabaseContextProps>(
  DEFAULT_CONTEXT_VALUE
);
