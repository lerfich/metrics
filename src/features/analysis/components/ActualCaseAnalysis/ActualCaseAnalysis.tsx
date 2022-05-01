import { Box } from "@material-ui/core";
import { Typography } from "shared/components/ui";

export const ActualCaseAnalysis = () => {
  return (
    <Box>
      {[0, 1, 2, 3, 4].map(() => (
        <Typography>ome graph</Typography>
      ))}
    </Box>
  );
};
