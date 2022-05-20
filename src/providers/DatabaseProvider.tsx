import React from "react";
import { DatabaseContext, DEFAULT_CONTEXT_VALUE } from "./DatabaseContext";
import { DatabaseContextValue } from "./types";

export type DatabaseContextProps = {
  children: React.ReactNode;
  defaultDatabaseValue?: DatabaseContextValue["database"];
  defaultInfluencersValue?: DatabaseContextValue["influencers"];
  defaultPositiveSemanticWordsValue?: DatabaseContextValue["positiveSemanticWords"];
  defaultNegativeSemanticWordsValue?: DatabaseContextValue["negativeSemanticWords"];
  defaultNeutralSemanticWordsValue?: DatabaseContextValue["neutralSemanticWords"];
};

export const DatabaseProvider = ({
  children,
  defaultDatabaseValue = DEFAULT_CONTEXT_VALUE.database,
  defaultInfluencersValue = DEFAULT_CONTEXT_VALUE.influencers,
  defaultPositiveSemanticWordsValue = DEFAULT_CONTEXT_VALUE.positiveSemanticWords,
  defaultNegativeSemanticWordsValue = DEFAULT_CONTEXT_VALUE.negativeSemanticWords,
  defaultNeutralSemanticWordsValue = DEFAULT_CONTEXT_VALUE.neutralSemanticWords,
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

  console.log(DEFAULT_CONTEXT_VALUE.positiveSemanticWords, "ss");

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
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
