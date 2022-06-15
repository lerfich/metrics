import { SortOrder } from "shared/types/sort";

export const SavedCasesSpreadsheetHeadlines = [
  {
    name: "title",
    label: "Title",
    id: "title",
    sortPath: (order: SortOrder) => ({ firstName: order }),
  },
  {
    name: "progress",
    label: "Progress",
    id: "progress",
  },
  {
    name: "status",
    label: "Status",
    id: "status",
  },
];
