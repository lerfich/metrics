import React from "react";
import { DATABASE } from "shared/constants";
import { DatabaseContext } from "./DatabaseContext";
import { DatabaseContextValue } from "./types";

export type DatabaseContextProps = {
  children: React.ReactNode;
};

export const DatabaseProvider = ({ children }: DatabaseContextProps) => {
  const [database, setDatabase] =
    React.useState<DatabaseContextValue>(DATABASE);
  React.useEffect(() => console.log(database, "data"), [database]);

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
