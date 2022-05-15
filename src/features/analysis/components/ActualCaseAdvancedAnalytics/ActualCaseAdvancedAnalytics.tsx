import { Box, useTheme } from "@material-ui/core";
import React from "react";
import { Chart, Typography } from "shared/components/ui";
import * as _ from "lodash";
import { css } from "@emotion/react";

const PIE_CHART_SIZE = 250;

const emotionCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

export const ActualCaseAdvancedAnalytics = ({
  setIsShowingCheckbox,
}: {
  setIsShowingCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const paint = {
    positive: 800,
    neutral: 1900,
    negative: 2700,
  };

  React.useEffect(() => setIsShowingCheckbox(false), [setIsShowingCheckbox]);

  const theme: any = useTheme();
  return (
    <Box display="grid" gridTemplateRows="auto" alignItems="center">
      <Typography variant="subtitle3" css={emotionCss}>
        Эмоциональный окрас (всех) сообщений
      </Typography>
      <Box sx={{ width: PIE_CHART_SIZE * 3.5, ml: 15, mt: -2 }}>
        <Chart
          type="pie"
          chartData={[
            {
              name: `Позитивный: ${paint.positive} (${_.round(
                (paint.positive * 100) /
                  (paint.positive + paint.neutral + paint.negative),
                0
              )}%)`,
              value: paint.positive,
              color: theme.palette.success.light,
            },
            {
              name: `Нейтральный: ${paint.neutral} (${_.round(
                (paint.neutral * 100) /
                  (paint.positive + paint.neutral + paint.negative),
                0
              )}%)`,
              value: paint.neutral,
              color: theme.palette.primary.light,
            },
            {
              name: `Негативный: ${paint.negative} (${_.round(
                (paint.negative * 100) /
                  (paint.positive + paint.neutral + paint.negative),
                0
              )}%)`,
              value: paint.negative,
              color: theme.palette.error.light,
            },
          ]}
          height={PIE_CHART_SIZE}
        />
      </Box>
    </Box>
  );
};
