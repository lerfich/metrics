import React, { useState } from "react";
import { DatabaseContext, DEFAULT_CONTEXT_VALUE } from "./DatabaseContext";
import { DatabaseContextValue, ParsedData } from "./types";

export type DatabaseContextProps = {
  children: React.ReactNode;
  defaultDatabaseValue?: DatabaseContextValue["database"];
  defaultInfluencersValue?: DatabaseContextValue["influencers"];
  defaultPositiveSemanticWordsValue?: DatabaseContextValue["positiveSemanticWords"];
  defaultNegativeSemanticWordsValue?: DatabaseContextValue["negativeSemanticWords"];
  defaultNeutralSemanticWordsValue?: DatabaseContextValue["neutralSemanticWords"];
  defaultTopicAnalysis?: DatabaseContextValue["topicAnalysis"];
  defaultParsedData?: DatabaseContextValue["parsedData"];
};

export const DatabaseProvider = ({
  children,
  defaultDatabaseValue = DEFAULT_CONTEXT_VALUE.database,
  defaultInfluencersValue = DEFAULT_CONTEXT_VALUE.influencers,
  defaultPositiveSemanticWordsValue = DEFAULT_CONTEXT_VALUE.positiveSemanticWords,
  defaultNegativeSemanticWordsValue = DEFAULT_CONTEXT_VALUE.negativeSemanticWords,
  defaultNeutralSemanticWordsValue = DEFAULT_CONTEXT_VALUE.neutralSemanticWords,
  defaultTopicAnalysis = DEFAULT_CONTEXT_VALUE.topicAnalysis,
  defaultParsedData = DEFAULT_CONTEXT_VALUE.parsedData,
}: DatabaseContextProps) => {
  const [database, setDatabase] = React.useState(defaultDatabaseValue);
  const [influencers, setInfluencers] = React.useState(defaultInfluencersValue);
  const [positiveSemanticWords, setPositiveSemanticWords] = React.useState(
    defaultPositiveSemanticWordsValue
  );
  const [negativeSemanticWords, setNegativeSemanticWords] = React.useState(
    defaultNegativeSemanticWordsValue
  );
  const [neutralSemanticWords, setNeutralSemanticWords] = React.useState(
    defaultNeutralSemanticWordsValue
  );
  const [topicAnalysis, setTopicAnalysis] =
    React.useState(defaultTopicAnalysis);
  const [parsedData, setParsedData] = useState<ParsedData | undefined>(
    defaultParsedData
  );

  return (
    <DatabaseContext.Provider
      value={{
        database,
        setDatabase,
        influencers,
        setInfluencers,
        positiveSemanticWords,
        setPositiveSemanticWords,
        negativeSemanticWords,
        setNegativeSemanticWords,
        neutralSemanticWords,
        setNeutralSemanticWords,
        topicAnalysis,
        setTopicAnalysis,
        parsedData,
        setParsedData,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
