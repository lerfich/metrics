import { SpreadsheetProvider } from "shared/features/spreadsheet";
import AddCase from "../components/AddCase";

export const AddCasePage = () => {
  return (
    <SpreadsheetProvider>
      <AddCase />
    </SpreadsheetProvider>
  );
};
