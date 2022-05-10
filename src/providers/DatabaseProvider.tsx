import React from "react";
import { DatabaseContext, DEFAULT_CONTEXT_VALUE } from "./DatabaseContext";
import { DatabaseContextValue } from "./types";

export type DatabaseContextProps = {
  children: React.ReactNode;
  defaultDatabaseValue?: DatabaseContextValue["database"];
  defaultInfluencersValue?: DatabaseContextValue["influencers"];
};

export const DatabaseProvider = ({
  children,
  defaultDatabaseValue = DEFAULT_CONTEXT_VALUE.database,
  defaultInfluencersValue = DEFAULT_CONTEXT_VALUE.influencers,
}: DatabaseContextProps) => {
  const [database, setDatabase] = React.useState(defaultDatabaseValue);
  const [influencers, setInfluencers] = React.useState(defaultInfluencersValue);

  return (
    <DatabaseContext.Provider
      value={{
        database,
        setDatabase,
        influencers,
        setInfluencers,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
