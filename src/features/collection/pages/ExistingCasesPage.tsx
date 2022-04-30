import { SpreadsheetProvider } from "shared/features/spreadsheet";
import SavedCases from "../components/SavedCases";

export const SavedCasesPage = () => {
  return (
    <SpreadsheetProvider>
      <SavedCases />
    </SpreadsheetProvider>
  );
};
