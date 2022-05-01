import React from "react";

import { DatabaseContext } from "./DatabaseContext";

export const useDatabaseContext = () => {
  const context = React.useContext(DatabaseContext);

  return context;
};
