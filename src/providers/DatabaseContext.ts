import React from "react";

import {
  DATABASE,
  TOP_INFLUENCERS,
  TOP_NEGATIVE_SEMANTIC_ANALYSIS_WORDS,
  TOP_NEUTRAL_SEMANTIC_ANALYSIS_WORDS,
  TOP_POSITIVE_SEMANTIC_ANALYSIS_WORDS,
} from "../shared/constants";
import { DatabaseContextValue } from "./types";

export const DEFAULT_CONTEXT_VALUE: DatabaseContextValue = {
  database: DATABASE,
  setDatabase: () => {},
  influencers: TOP_INFLUENCERS,
  setInfluencers: () => {},
  positiveSemanticWords: TOP_POSITIVE_SEMANTIC_ANALYSIS_WORDS,
  setPositiveSemanticWords: () => {},
  negativeSemanticWords: TOP_NEGATIVE_SEMANTIC_ANALYSIS_WORDS,
  setNegativeSemanticWords: () => {},
  neutralSemanticWords: TOP_NEUTRAL_SEMANTIC_ANALYSIS_WORDS,
  setNeutralSemanticWords: () => {},
};

export const DatabaseContext = React.createContext<DatabaseContextValue>(
  DEFAULT_CONTEXT_VALUE
);
