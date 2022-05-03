import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";

export const useSavedCases = () => {
  const { database } = useDatabaseContext();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {}, 2000);
    setLoading(false);
  }, []);

  return { data: database, loading };
};
