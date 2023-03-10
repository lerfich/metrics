import React from "react";
import { PARSED_DATA_DEFAULT } from "shared/constants/parsedData";

import {
  DATABASE,
  TOP_INFLUENCERS,
  TOP_NEGATIVE_SEMANTIC_ANALYSIS_WORDS,
  TOP_NEUTRAL_SEMANTIC_ANALYSIS_WORDS,
  TOP_POSITIVE_SEMANTIC_ANALYSIS_WORDS,
  TOPICS_ANALYSIS_LIST,
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
  topicAnalysis: TOPICS_ANALYSIS_LIST,
  setTopicAnalysis: () => {},
  parsedData: undefined,
  setParsedData: () => {},
};

export const DatabaseContext = React.createContext<DatabaseContextValue>(
  DEFAULT_CONTEXT_VALUE
);
