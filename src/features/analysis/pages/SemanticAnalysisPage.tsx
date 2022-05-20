import React from "react";
import { SpreadsheetProvider } from "shared/features/spreadsheet";
import { ActualCaseSemanticAnalytics } from "../components/ActualCaseSemanticAnalytics/ActualCaseSemanticAnalytics";

export const SemanticAnalysisPage = ({
  setIsShowingCheckbox,
}: {
  setIsShowingCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  React.useEffect(() => setIsShowingCheckbox(false), [setIsShowingCheckbox]);
  return (
    <SpreadsheetProvider>
      <ActualCaseSemanticAnalytics />
    </SpreadsheetProvider>
  );
};
