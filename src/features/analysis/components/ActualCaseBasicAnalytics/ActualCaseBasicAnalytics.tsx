import React from "react";

import { Box, MenuItem, useTheme } from "@material-ui/core";
import {
  BarChartData,
  Chart,
  ChartDateRange,
  LineChartData,
  Select,
  Typography,
} from "shared/components/ui";
import * as _ from "lodash";
import { DateTime } from "luxon";
import { GRAPH_DATA_FREQUENCY } from "./constants";
import { css } from "@emotion/react";
import {
  inputInitiatorsAndInvolvedCounts,
  inputPostsCounts,
  inputUniqueUsers,
} from "shared/constants";

interface ActualCaseBasicAnalyticsType {
  loading?: boolean;
}

const PIE_CHART_SIZE = 250;

export const ActualCaseBasicAnalytics: React.FC<
  ActualCaseBasicAnalyticsType
> = ({ loading }) => {
  const theme: any = useTheme();

  const [frequency, setFrequency] = React.useState("");

  const onChangeFrequency = React.useCallback(
    (e) => setFrequency(e.target.value),
    [setFrequency]
  );

  const currentFrequency = React.useMemo(() => {
    switch (frequency) {
      case Object.keys(GRAPH_DATA_FREQUENCY)[0]: {
        return {
          min: new Date(DateTime.now().minus({ minutes: 1 }).toISO()),
          max: new Date(DateTime.now().plus({ weeks: 1 }).toISO()),
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[1]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ months: 1 }).toISO()),
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[2]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ years: 1 }).toISO()),
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[3]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ years: 12 }).toISO()),
        };
      }
      default: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ weeks: 2 }).toISO()),
        };
      }
    }
  }, [frequency]);

  const parsedPosts = React.useMemo(
    (): BarChartData =>
      inputPostsCounts
        .filter(
          ({ date }) =>
            currentFrequency.max >= new Date(date.toISO()) &&
            new Date(date.toISO()) >= currentFrequency.min
        )
        .map(({ date, count }) => ({
          category: date.setLocale("ru").toFormat("D"),
          value: count,
        })),
    [currentFrequency.max, currentFrequency.min]
  );

  const uniqueUsers = React.useMemo(
    (): LineChartData =>
      inputUniqueUsers.filter(
        ({ date }) =>
          currentFrequency.max >= date && date >= currentFrequency.min
      ),
    [currentFrequency.max, currentFrequency.min]
  );

  const chartDateRange: ChartDateRange = React.useMemo(
    () => ({
      min: currentFrequency.min,
      max: currentFrequency.max,
    }),
    [currentFrequency.max, currentFrequency.min]
  );

  const initiatorsAndInvolvedCounts = React.useMemo(
    () =>
      inputInitiatorsAndInvolvedCounts
        ?.filter(
          ({ date }) =>
            currentFrequency.max >= date && date >= currentFrequency.min
        )
        .slice(-1)[0] ?? { initiators: 0, outreach: 0 },
    [currentFrequency.max, currentFrequency.min]
  );

  const ratios = React.useMemo(
    () => ({
      initiators:
        _.round(
          (initiatorsAndInvolvedCounts.initiators * 100) /
            (initiatorsAndInvolvedCounts.initiators +
              initiatorsAndInvolvedCounts.outreach),
          0
        ) + "%",
      outreach:
        _.round(
          (initiatorsAndInvolvedCounts.outreach * 100) /
            (initiatorsAndInvolvedCounts.initiators +
              initiatorsAndInvolvedCounts.outreach),
          0
        ) + "%",
    }),
    [
      initiatorsAndInvolvedCounts.initiators,
      initiatorsAndInvolvedCounts.outreach,
    ]
  );

  return (
    <Box display="grid" gridTemplateRows="auto">
      <Box display="grid" mb={1} mt={-3} px={3} gridTemplateColumns="auto">
        <Select
          variant="outlined"
          label="Выбрать частоту"
          value={frequency}
          onChange={onChangeFrequency}
          size="small"
        >
          {Object.entries(GRAPH_DATA_FREQUENCY).map((entry) => (
            <MenuItem
              key={entry[0]}
              value={entry[0]}
              css={css`
                align-items: center;
                justify-content: center;
              `}
            >
              <Typography>{entry[1]}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Chart
          type="bar"
          chartData={parsedPosts}
          height={290}
          loading={loading}
          xAxisName={"Частота"}
          yAxisName={"Количество публикаций"}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Chart
          type="line"
          chartData={uniqueUsers}
          height={290}
          loading={loading}
          xAxisShowLabel={true}
          dateRange={chartDateRange}
          xAxisName={"Частота"}
          yAxisName={"Уникальные пользователи"}
        />
      </Box>
      <Box sx={{ width: PIE_CHART_SIZE * 3.5, ml: 15, mt: -2 }}>
        <Chart
          type="pie"
          chartData={[
            {
              name: `Инициаторы: ${initiatorsAndInvolvedCounts.initiators} (${ratios.initiators})`,
              value: initiatorsAndInvolvedCounts.initiators,
              color: theme.palette.primary.dark,
            },
            {
              name: `Привлеченная аудитория: ${initiatorsAndInvolvedCounts.outreach} (${ratios.outreach})`,
              value: initiatorsAndInvolvedCounts.outreach,
              color: theme.palette.error.light,
            },
          ]}
          height={PIE_CHART_SIZE}
        />
      </Box>
    </Box>
  );
};
