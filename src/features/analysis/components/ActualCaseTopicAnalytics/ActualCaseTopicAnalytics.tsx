import { Box } from "@material-ui/core";
import React from "react";
import { Chart } from "shared/components/ui";
import { bubbleOption, horizontalData } from "./constants";

export const ActualCaseTopicAnalytics = () => {
  console.log(bubbleOption, "option");
  console.log(horizontalData, "hor");
  return (
    <Box display="grid" gridTemplateColumns="auto">
      topic analysis
      <Box display="flex" justifyContent="center" alignItems="center">
        <Chart
          type="bubble"
          chartData={bubbleOption}
          // extraChartData={[]}
          // onItemClick={() => console.log("u clicked...")}
          height={390}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Chart
          type="bar"
          categoryName="shto to"
          chartData={horizontalData}
          // extraChartData={[]}
          // onItemClick={() => console.log("u clicked...")}
          height={290}
        />
      </Box>
    </Box>
  );
};
