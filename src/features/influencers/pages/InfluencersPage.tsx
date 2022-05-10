import { SpreadsheetProvider } from "shared/features/spreadsheet";
import { Influencers } from "../components/Influencers";

export const InfluencersPage = () => {
  return (
    <SpreadsheetProvider>
      <Influencers />
    </SpreadsheetProvider>
  );
};
