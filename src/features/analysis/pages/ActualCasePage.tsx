import { SearchProvider } from "shared/features/search";
import { SpreadsheetProvider } from "shared/features/spreadsheet";
import { ActualCase } from "../components/ActualCase";

export const ActualCasePage = () => {
  return (
    <SpreadsheetProvider>
      <SearchProvider>
        <ActualCase />
      </SearchProvider>
    </SpreadsheetProvider>
  );
};
