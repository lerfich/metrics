import React from "react";
import { SpreadsheetProvider } from "shared/features/spreadsheet";
import { Influencers } from "../components/ActualCaseInfluencers/components/Influencers";

export const InfluencersPage = ({
  setIsShowingCheckbox,
}: {
  setIsShowingCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  React.useEffect(() => setIsShowingCheckbox(false), [setIsShowingCheckbox]);
  return (
    <SpreadsheetProvider>
      <Influencers />
    </SpreadsheetProvider>
  );
};
