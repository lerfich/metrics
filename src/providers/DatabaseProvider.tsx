import React from "react";
import { DatabaseContext, DEFAULT_CONTEXT_VALUE } from "./DatabaseContext";
import { DatabaseContextValue } from "./types";

export type DatabaseContextProps = {
  children: React.ReactNode;
  defaultDatabaseValue?: DatabaseContextValue["database"];
};

export const DatabaseProvider = ({
  children,
  defaultDatabaseValue = DEFAULT_CONTEXT_VALUE.database,
}: DatabaseContextProps) => {
  const [database, setDatabase] = React.useState(defaultDatabaseValue);
  React.useEffect(
    () => console.log(database, "in provider database"),
    [database]
  );

  return (
    <DatabaseContext.Provider
      value={{
        database,
        setDatabase,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
