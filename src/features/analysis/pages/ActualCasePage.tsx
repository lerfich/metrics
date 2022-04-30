import { SpreadsheetProvider } from "shared/features/spreadsheet";
import { ActualCase } from "../components/ActualCase";

export const ActualCasePage = () => {
  return (
    <SpreadsheetProvider>
      <ActualCase />
    </SpreadsheetProvider>
  );
};
