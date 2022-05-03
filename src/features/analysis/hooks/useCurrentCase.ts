import { useDatabaseContext } from "providers/useDatabaseContext";

export const useCurrentCase = (receivedId: string) => {
  const { database } = useDatabaseContext();
  return {
    data: database.find((item) => item.id === receivedId) || undefined,
    loading: false,
  };
};
