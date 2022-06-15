import React from "react";

import { Avatar, Box, IconButton, MenuItem, useTheme } from "@material-ui/core";
import {
  Chart,
  ChartDateRange,
  Icon,
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
import {
  downloadDiagramHandler,
  downloadPostsHandler,
  downloadUniqueHandler,
} from "./utils";

interface ActualCaseBasicAnalyticsType {
  loading?: boolean;
  socialFilter: {
    [x: string]: boolean;
  };
  setIsShowingCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}

const avatarCss = css`
  margin-top: -30%;
`;

const iconCss = (theme: any) => css`
  color: ${theme.palette.warning.light};
`;

const exportCss = (theme: any) => css`
  color: ${theme.palette.primary.dark};
  line-height: 10px;
`;

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

  const { mainParsedPostsList, additionalParsedPostsList } = React.useMemo(
    () => ({
      mainParsedPostsList: inputPostsCounts
        .filter(
          ({ sn, date }) =>
            activeFiltersList[0] === sn &&
            currentFrequency.max >= new Date(date.toISO()) &&
            new Date(date.toISO()) >= currentFrequency.min
        )
        .map(({ date, count }) => ({
          date: new Date(date.setLocale("eng").toISO()),
          value: count,
        })),
      additionalParsedPostsList: inputPostsCounts
        .filter(
          ({ sn, date }) =>
            activeFiltersList[1] === sn &&
            currentFrequency.max >= new Date(date.toISO()) &&
            new Date(date.toISO()) >= currentFrequency.min
        )
        .map(({ date, count }) => ({
          date: new Date(date.setLocale("eng").toISO()),
          value: count,
        })),
    }),
    [activeFiltersList, currentFrequency.max, currentFrequency.min]
  );

  const { mainUniqueUsersList, additionalUniqueUsersList } = React.useMemo(
    () => ({
      mainUniqueUsersList: inputUniqueUsers.filter(
        ({ sn, date }) =>
          activeFiltersList[0] === sn &&
          currentFrequency.max >= date &&
          date >= currentFrequency.min
      ),
      additionalUniqueUsersList: inputUniqueUsers.filter(
        ({ sn, date }) =>
          activeFiltersList[1] === sn &&
          currentFrequency.max >= date &&
          date >= currentFrequency.min
      ),
    }),
    [activeFiltersList, currentFrequency.max, currentFrequency.min]
  );

  const {
    mainInitiatorsAndInvolvedCounts,
    additionalInitiatorsAndInvolvedCounts,
  } = React.useMemo(
    () => ({
      mainInitiatorsAndInvolvedCounts: inputInitiatorsAndInvolvedCounts
        ?.filter(
          ({ sn, date }) =>
            activeFiltersList[0] === sn &&
            currentFrequency.max >= date &&
            date >= currentFrequency.min
        )
        .slice(-1)[0] ?? { initiators: 0, outreach: 0 },
      additionalInitiatorsAndInvolvedCounts: inputInitiatorsAndInvolvedCounts
        ?.filter(
          ({ sn, date }) =>
            activeFiltersList[1] === sn &&
            currentFrequency.max >= date &&
            date >= currentFrequency.min
        )
        .slice(-1)[0] ?? { initiators: 0, outreach: 0 },
    }),
    [activeFiltersList, currentFrequency.max, currentFrequency.min]
  );

  const getRatio = React.useCallback(
    (num: number, den: number) =>
      activeFiltersList.length > 1
        ? _.round(
            (num * 100) /
              (mainInitiatorsAndInvolvedCounts.initiators +
                mainInitiatorsAndInvolvedCounts.outreach +
                additionalInitiatorsAndInvolvedCounts.initiators +
                additionalInitiatorsAndInvolvedCounts.outreach),
            0
          ) + "%"
        : _.round((num * 100) / den, 0) + "%",
    [
      activeFiltersList.length,
      additionalInitiatorsAndInvolvedCounts.initiators,
      additionalInitiatorsAndInvolvedCounts.outreach,
      mainInitiatorsAndInvolvedCounts.initiators,
      mainInitiatorsAndInvolvedCounts.outreach,
    ]
  );

  const chartDateRange: ChartDateRange = React.useMemo(
    () => ({
      min: currentFrequency.min,
      max: currentFrequency.max,
    }),
    [currentFrequency.max, currentFrequency.min]
  );

  const { mainPieChartData, additionalPieChartData } = React.useMemo(
    () => ({
      mainPieChartData: [
        {
          name: `Initiators ${activeFiltersList[0]}:  ${
            mainInitiatorsAndInvolvedCounts.initiators
          } (${getRatio(
            mainInitiatorsAndInvolvedCounts.initiators,
            mainInitiatorsAndInvolvedCounts.initiators +
              mainInitiatorsAndInvolvedCounts.outreach
          )})`,
          value: mainInitiatorsAndInvolvedCounts.initiators,
          color: theme.palette.primary.dark,
        },
        {
          name: `Attracted audience ${activeFiltersList[0]}:  ${
            mainInitiatorsAndInvolvedCounts.outreach
          } (${getRatio(
            mainInitiatorsAndInvolvedCounts.outreach,
            mainInitiatorsAndInvolvedCounts.initiators +
              mainInitiatorsAndInvolvedCounts.outreach
          )})`,
          value: mainInitiatorsAndInvolvedCounts.outreach,
          color: theme.palette.error.light,
        },
      ],
      additionalPieChartData:
        activeFiltersList.length > 1
          ? [
              {
                name: `Initiators ${activeFiltersList[1]}: ${
                  additionalInitiatorsAndInvolvedCounts.initiators
                } (${getRatio(
                  additionalInitiatorsAndInvolvedCounts.initiators,
                  additionalInitiatorsAndInvolvedCounts.initiators +
                    additionalInitiatorsAndInvolvedCounts.outreach
                )})`,
                value: additionalInitiatorsAndInvolvedCounts.initiators,
                color: theme.palette.info.dark,
              },
              {
                name: `Attracted audience ${activeFiltersList[1]}: ${
                  additionalInitiatorsAndInvolvedCounts.outreach
                } (${getRatio(
                  additionalInitiatorsAndInvolvedCounts.initiators,
                  additionalInitiatorsAndInvolvedCounts.initiators +
                    additionalInitiatorsAndInvolvedCounts.outreach
                )})`,
                value: additionalInitiatorsAndInvolvedCounts.outreach,
                color: theme.palette.warning.light,
              },
            ]
          : [],
    }),
    [
      activeFiltersList,
      additionalInitiatorsAndInvolvedCounts.initiators,
      additionalInitiatorsAndInvolvedCounts.outreach,
      getRatio,
      mainInitiatorsAndInvolvedCounts.initiators,
      mainInitiatorsAndInvolvedCounts.outreach,
      theme.palette.error.light,
      theme.palette.info.dark,
      theme.palette.primary.dark,
      theme.palette.warning.light,
    ]
  );

  return (
    <Box display="grid" gridTemplateRows="auto">
      <Box display="grid" mb={1} mt={-3} px={3} gridTemplateColumns="auto">
        <Select
          variant="outlined"
          label="Select frequency"
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
          chartData={mainParsedPostsList}
          extraChartData={
            activeFiltersList.length === 1 ? [] : additionalParsedPostsList
          }
          height={290}
          loading={loading}
          xAxisName={"Frequency"}
          yAxisName={"Number of publications"}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          mt={-4}
        >
          <Typography variant="subtitle5" css={exportCss}>
            Export
          </Typography>
          <Avatar css={avatarCss}>
            <IconButton
              onClick={downloadPostsHandler(
                activeFiltersList,
                inputPostsCounts,
                currentFrequency
              )}
            >
              <Icon name="FileDownload" css={iconCss} />
            </IconButton>
          </Avatar>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Chart
          type="line"
          chartData={mainUniqueUsersList}
          extraChartData={
            activeFiltersList.length === 1 ? [] : additionalUniqueUsersList
          }
          height={290}
          loading={loading}
          xAxisShowLabel={true}
          dateRange={chartDateRange}
          xAxisName={"Frequency"}
          yAxisName={"Unique users"}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          mt={-4}
        >
          <Typography variant="subtitle5" css={exportCss}>
            Export
          </Typography>
          <Avatar css={avatarCss}>
            <IconButton
              onClick={downloadUniqueHandler(
                activeFiltersList,
                mainUniqueUsersList,
                additionalUniqueUsersList
              )}
            >
              <Icon name="FileDownload" css={iconCss} />
            </IconButton>
          </Avatar>
        </Box>
      </Box>
      <Box
        sx={{ width: PIE_CHART_SIZE * 3.5, ml: 15, mt: -2 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Chart
          type="pie"
          chartData={[...mainPieChartData, ...additionalPieChartData]}
          height={PIE_CHART_SIZE}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          mt={-4}
        >
          <Typography variant="subtitle5" css={exportCss}>
            Export
          </Typography>
          <Avatar css={avatarCss}>
            <IconButton
              onClick={downloadDiagramHandler(
                activeFiltersList,
                mainInitiatorsAndInvolvedCounts,
                additionalInitiatorsAndInvolvedCounts,
                getRatio
              )}
            >
              <Icon name="FileDownload" css={iconCss} />
            </IconButton>
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};
