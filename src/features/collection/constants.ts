import { SortOrder } from "shared/types/sort";

export const SavedCasesSpreadsheetHeadlines = [
  {
    name: "title",
    label: "Название",
    id: "title",
    sortPath: (order: SortOrder) => ({ firstName: order }),
  },
  {
    name: "progress",
    label: "Прогресс",
    id: "progress",
  },
  {
    name: "status",
    label: "Статус",
    id: "status",
  },
];
