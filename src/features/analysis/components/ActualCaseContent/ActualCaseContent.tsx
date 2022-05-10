import React from "react";

import { Box } from "@material-ui/core";
import { PaperLayout } from "shared/components/layouts/PaperLayout";
import { ActualCaseContentFilters } from "./ActualCaseContentFilters";
import { ActualCaseContentMetaData } from "./ActualCaseContentMetaData";
import { ActualCaseContentSpreadsheet } from "./ActualCaseContentSpreadsheet";
import { useSearchContext } from "shared/features/search";
import { ActualCaseContentInput } from "features/analysis/types";

export const ActualCaseContent: React.FC<ActualCaseContentInput> = ({
  tweets,
  tweetsCount,
  generalStats,
}) => {
  // const { searchQuery } = useSearchContext();
  return (
    <Box
      display="grid"
      gridTemplateRows="auto"
      mx={2}
      my={3}
      gridRowGap={5}
      // height="100%"
    >
      <ActualCaseContentMetaData generalStats={generalStats} />
      <ActualCaseContentFilters />
      <ActualCaseContentSpreadsheet tweets={tweets} tweetsCount={tweetsCount} />
    </Box>
  );
};
