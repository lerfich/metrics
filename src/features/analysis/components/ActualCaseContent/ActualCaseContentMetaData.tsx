import React from "react";

import { Box } from "@material-ui/core";
import { Typography } from "shared/components/ui";
import { css } from "@emotion/react";

import { TWEETS_COUNT_CATEGORIES } from "shared/constants";
import { ActualCaseContentInput } from "features/analysis/types";

const statsCss = (theme: any) => css`
  color: ${theme.palette.primary.dark};
`;

export const ActualCaseContentMetaData: React.FC<ActualCaseContentInput> = ({
  generalStats,
}) => {
  const stats = React.useMemo(
    () => [
      { likes: (generalStats && generalStats["likes"]) || 0 },
      { comments: (generalStats && generalStats["comments"]) || 0 },
      { posts: (generalStats && generalStats["posts"]) || 0 },
      { reposts: (generalStats && generalStats["reposts"]) || 0 },
      {
        general_coverage:
          (generalStats && generalStats["general_coverage"]) || 0,
      },
    ],
    [generalStats]
  );

  return (
    <Box
      display="grid"
      gridTemplateColumns="auto"
      border={1}
      borderColor={"gray"}
      borderRadius={2}
      mx={1}
      mt={-4}
      py={2}
      px={3}
    >
      <Typography variant="subtitle4">Метаданные: </Typography>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr">
        <Box display="grid" gridTemplateRows="auto" ml={1}>
          <Typography variant="subtitle5" css={statsCss}>
            {TWEETS_COUNT_CATEGORIES[0].label}:{" "}
            {generalStats && generalStats["likes"]}
          </Typography>
          <Typography variant="subtitle5" css={statsCss}>
            {TWEETS_COUNT_CATEGORIES[1].label}:{" "}
            {generalStats && generalStats["comments"]}
          </Typography>
        </Box>
        <Box display="grid" gridTemplateRows="auto" ml={1}>
          <Typography variant="subtitle5" css={statsCss}>
            {TWEETS_COUNT_CATEGORIES[2].label}:{" "}
            {generalStats && generalStats["posts"]}
          </Typography>
          <Typography variant="subtitle5" css={statsCss}>
            {TWEETS_COUNT_CATEGORIES[3].label}:{" "}
            {generalStats && generalStats["reposts"]}
          </Typography>
        </Box>
        <Box display="grid" gridTemplateRows="auto" ml={1}>
          <Typography variant="subtitle5" css={statsCss}>
            {TWEETS_COUNT_CATEGORIES[4].label}:{" "}
            {generalStats && generalStats["general_coverage"]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
