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
    label: "User",
    id: "user",
  },
  {
    name: "date",
    label: "Date",
    id: "date",
  },
  {
    name: "text",
    label: "Message",
    id: "text",
    // sortPath: (order: SortOrder) => ({
    //   userPreferences: { phoneNumber: order },
    // }),
  },
];
