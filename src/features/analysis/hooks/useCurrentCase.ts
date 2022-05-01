import { DATABASE } from "shared/constants/datebase";

export const useCurrentCase = (receivedId: string) => {
  return {
    data: DATABASE.find((item) => item.id === receivedId) || undefined,
    loading: false,
  };
};
