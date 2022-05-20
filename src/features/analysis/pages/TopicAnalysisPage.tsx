import React from "react";
import { SpreadsheetProvider } from "shared/features/spreadsheet";
import { ActualCaseTopicAnalytics } from "../components/ActualCaseTopicAnalytics/ActualCaseTopicAnalytics";

export const TopicAnalysisPage = ({
  setIsShowingCheckbox,
}: {
  setIsShowingCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  React.useEffect(() => setIsShowingCheckbox(false), [setIsShowingCheckbox]);
  return (
    <SpreadsheetProvider>
      <ActualCaseTopicAnalytics />
    </SpreadsheetProvider>
  );
};
