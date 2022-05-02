import React from "react";

import { Box } from "@material-ui/core";
import { Button, Typography } from "shared/components/ui";
import { css } from "@emotion/react";

import { TWEETS_COUNT_CATEGORIES } from "shared/constants";
import { ActualCaseContentInput } from "features/analysis/types";
import { downloadCsv, formatDataToCsv } from "shared/features/spreadsheet";
import { GeneralStatsType } from "providers/types";

const statsCss = (theme: any) => css`
  color: ${theme.palette.primary.dark};
`;

export const ActualCaseContentMetaData: React.FC<ActualCaseContentInput> = ({
  generalStats,
}) => {
  const onDownloadMetadata = React.useCallback(() => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data: [
          {
            likes: generalStats?.likes ?? "Количество лайков не найдено",
            coments:
              generalStats?.comments ?? "Количество комментариев не найдено",
            posts: generalStats?.posts ?? "Количество постов не найдено",
            reposts: generalStats?.reposts ?? "Количество репостов не найдено",
            general_coverate:
              generalStats?.general_coverage ?? "Общий охват не найден",
          },
        ],
        titles: [
          "Количество лайков",
          "Количество комментариев",
          "Количество постов",
          "Количество репостов",
          "Общий охват",
        ],
      }),
      "Метаданные исследования"
    );
  }, [
    generalStats?.comments,
    generalStats?.general_coverage,
    generalStats?.likes,
    generalStats?.posts,
    generalStats?.reposts,
  ]);
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
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        justifyContent="center"
      >
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
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={onDownloadMetadata}
            >
              Загрузить метаданные
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
