import { SortOrder } from "shared/types/sort";

export const ActualCaseSpreadsheetHeadlines = [
  {
    name: "tweetId",
    label: "Tweet ID",
    id: "tweetId",
    sortPath: (order: SortOrder) => ({ firstName: order }),
  },
  {
    name: "user",
    label: "Пользователь",
    id: "user",
  },
  {
    name: "date",
    label: "Дата",
    id: "date",
  },
  {
    name: "text",
    label: "Текст",
    id: "text",
    // sortPath: (order: SortOrder) => ({
    //   userPreferences: { phoneNumber: order },
    // }),
  },
];
