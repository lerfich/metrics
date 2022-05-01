import { DatabaseProvider } from "providers/DatabaseProvider";
import { SpreadsheetProvider } from "shared/features/spreadsheet";
import AddCase from "../components/AddCase";

export const AddCasePage = () => {
  return (
    <DatabaseProvider>
      <AddCase />
    </DatabaseProvider>
  );
};
