import React from "react";

import { DATABASE, TOP_INFLUENCERS } from "../shared/constants";
import { DatabaseContextValue } from "./types";

export const DEFAULT_CONTEXT_VALUE: DatabaseContextValue = {
  database: DATABASE,
  setDatabase: () => {},
  influencers: TOP_INFLUENCERS,
  setInfluencers: () => {},
};

export const DatabaseContext = React.createContext<DatabaseContextValue>(
  DEFAULT_CONTEXT_VALUE
);
