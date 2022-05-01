import { DatabaseProvider } from "providers/DatabaseProvider";
import { SearchProvider } from "shared/features/search";
import { SpreadsheetProvider } from "shared/features/spreadsheet";
import SavedCases from "../components/SavedCases";

export const SavedCasesPage = () => {
  return (
    <SpreadsheetProvider>
      <SearchProvider>
        <DatabaseProvider>
          <SavedCases />
        </DatabaseProvider>
      </SearchProvider>
    </SpreadsheetProvider>
  );
};
