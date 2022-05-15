import React from "react";

import { Box, MenuItem, useTheme } from "@material-ui/core";
import {
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
  SOCIAL_NETWORKS,
} from "shared/constants";

interface ActualCaseBasicAnalyticsType {
  loading?: boolean;
  socialFilter: {
    [x: string]: boolean;
  };
  setIsShowingCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}

const PIE_CHART_SIZE = 250;

export const ActualCaseBasicAnalytics: React.FC<
  ActualCaseBasicAnalyticsType
> = ({ loading, socialFilter, setIsShowingCheckbox }) => {
  const theme: any = useTheme();

  React.useEffect(() => setIsShowingCheckbox(true), [setIsShowingCheckbox]);
  const [frequency, setFrequency] = React.useState(
    Object.keys(GRAPH_DATA_FREQUENCY)[0]
  );

  const onChangeFrequency = React.useCallback(
    (e) => setFrequency(e.target.value),
    [setFrequency]
  );

  React.useEffect(() => console.log(socialFilter, "ff"), [socialFilter]);
  const activeFiltersList = Object.keys(socialFilter).filter(
    (key) => socialFilter[key]
  );

  const currentFrequency = React.useMemo(() => {
    switch (frequency) {
      case Object.keys(GRAPH_DATA_FREQUENCY)[0]: {
        return {
          min: new Date(DateTime.now().minus({ minutes: 1 }).toISO()),
          max: new Date(DateTime.now().plus({ days: 1 }).toISO()), // по часам
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[1]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ week: 1 }).toISO()), // по дням
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[2]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ month: 1 }).toISO()), // по неделям
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[3]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ year: 1 }).toISO()), // по месяцам
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[4]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ year: 1 }).toISO()), // по кварталам
        };
      }

      case Object.keys(GRAPH_DATA_FREQUENCY)[5]: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ years: 4 }).toISO()), // по годам
        };
      }

      default: {
        return {
          min: new Date(DateTime.now().toISO()),
          max: new Date(DateTime.now().plus({ days: 1 }).toISO()),
        };
      }
    }
  }, [frequency]);

  const parsedPosts = React.useMemo(
    (): LineChartData =>
      inputPostsCounts
        .filter(({ sn }) => activeFiltersList[0] === sn)
        .filter(
          ({ date }) =>
            currentFrequency.max >= new Date(date.toISO()) &&
            new Date(date.toISO()) >= currentFrequency.min
        )
        .map(({ date, count }) => ({
          date: new Date(date.setLocale("ru").toISO()),
          value: count,
        })),
    [activeFiltersList, currentFrequency.max, currentFrequency.min]
  );

  const uniqueUsers = React.useMemo(
    (): LineChartData =>
      inputUniqueUsers
        .filter(({ sn }) => activeFiltersList[0] === sn)
        .filter(
          ({ date }) =>
            currentFrequency.max >= date && date >= currentFrequency.min
        ),
    [activeFiltersList, currentFrequency.max, currentFrequency.min]
  );

  const initiatorsAndInvolvedCounts = React.useMemo(
    () =>
      inputInitiatorsAndInvolvedCounts
        ?.filter(({ sn }) => activeFiltersList[0] === sn)
        ?.filter(
          ({ date }) =>
            currentFrequency.max >= date && date >= currentFrequency.min
        )
        .slice(-1)[0] ?? { initiators: 0, outreach: 0 },
    [activeFiltersList, currentFrequency.max, currentFrequency.min]
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

  const chartDateRange: ChartDateRange = React.useMemo(
    () => ({
      min: currentFrequency.min,
      max: currentFrequency.max,
    }),
    [currentFrequency.max, currentFrequency.min]
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
          type="line"
          dateRange={chartDateRange}
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
