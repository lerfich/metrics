import { Avatar, Box, IconButton, MenuItem, useTheme } from "@material-ui/core";
import React from "react";
import {
  Button,
  Chart,
  ChartDateRange,
  Icon,
  Select,
  Typography,
} from "shared/components/ui";
import * as _ from "lodash";
import { css } from "@emotion/react";
import { GRAPH_DATA_FREQUENCY } from "../ActualCaseBasicAnalytics/constants";
import { DateTime } from "luxon";
import {
  inputNegativeTonality,
  inputNeutralTonality,
  inputPositiveTonality,
} from "shared/constants";
import { downloadEmotionalColoringHandler } from "./utils";
import { useHistory, useParams } from "react-router-dom";
import { buildUrl } from "shared/routes/routerUtils";
import { APP_URL } from "shared/components/navigation/constants";

const PIE_CHART_SIZE = 250;

const reviewButtonCss = (theme: any) => css`
  color: ${theme.palette.error.light};
  border: 1px solid ${theme.palette.primary.light};
  border-radius: 2%;
`;

const exportCss = (theme: any) => css`
  color: ${theme.palette.primary.dark};
  line-height: 10px;
`;

const avatarCss = css`
  margin-top: -30%;
`;

const iconCss = (theme: any) => css`
  color: ${theme.palette.warning.light};
`;

const positiveCss = (theme: any) => css`
  color: ${theme.palette.success.dark};
`;

const neutralCss = (theme: any) => css`
  color: ${theme.palette.info.dark};
`;

const negativeCss = (theme: any) => css`
  color: ${theme.palette.error.dark};
`;

const emotionCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

export const ActualCaseAdvancedAnalytics = ({
  setIsShowingCheckbox,
}: {
  setIsShowingCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  React.useEffect(() => setIsShowingCheckbox(false), [setIsShowingCheckbox]);

  const paint = {
    positive: 800,
    neutral: 1900,
    negative: 2700,
  };

  const [frequency, setFrequency] = React.useState(
    Object.keys(GRAPH_DATA_FREQUENCY)[0]
  );

  const onChangeFrequency = React.useCallback(
    (e) => setFrequency(e.target.value),
    [setFrequency]
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

  const chartDateRange: ChartDateRange = React.useMemo(
    () => ({
      min: currentFrequency.min,
      max: currentFrequency.max,
    }),
    [currentFrequency.max, currentFrequency.min]
  );

  const {
    mainPostsTonalityList,
    extraPostsTonalityList,
    additionalPostsTonalityList,
  } = React.useMemo(
    () => ({
      mainPostsTonalityList: inputPositiveTonality.filter(
        ({ date }) =>
          currentFrequency.max >= date && date >= currentFrequency.min
      ),
      extraPostsTonalityList: inputNeutralTonality.filter(
        ({ date }) =>
          currentFrequency.max >= date && date >= currentFrequency.min
      ),
      additionalPostsTonalityList: inputNegativeTonality.filter(
        ({ date }) =>
          currentFrequency.max >= date && date >= currentFrequency.min
      ),
    }),
    [currentFrequency.max, currentFrequency.min]
  );

  const theme: any = useTheme();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const redirectToSemanticAnalysis = React.useCallback(() => {
    const url = buildUrl(APP_URL.actualCaseSemanticAnalytics, {
      pathParams: { id },
    });
    history.push(url);
  }, [history, id]);

  const redirectToTopicAnalysis = React.useCallback(() => {
    const url = buildUrl(APP_URL.actualCaseTopicAnalytics, {
      pathParams: { id },
    });
    history.push(url);
  }, [history, id]);

  return (
    <Box
      display="grid"
      gridTemplateRows="auto"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" justifyContent="center">
        <Typography variant="subtitle3" css={emotionCss}>
          Emotional coloring of messages
        </Typography>
      </Box>
      <Box
        sx={{ width: PIE_CHART_SIZE * 3.5, mt: -2 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Chart
          type="pie"
          chartData={[
            {
              name: `Positive: ${paint.positive} (${_.round(
                (paint.positive * 100) /
                  (paint.positive + paint.neutral + paint.negative),
                0
              )}%)`,
              value: paint.positive,
              color: theme.palette.success.light,
            },
            {
              name: `Neutral: ${paint.neutral} (${_.round(
                (paint.neutral * 100) /
                  (paint.positive + paint.neutral + paint.negative),
                0
              )}%)`,
              value: paint.neutral,
              color: theme.palette.primary.light,
            },
            {
              name: `Negative: ${paint.negative} (${_.round(
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
            <IconButton onClick={downloadEmotionalColoringHandler(paint)}>
              <Icon name="FileDownload" css={iconCss} />
            </IconButton>
          </Avatar>
        </Box>
      </Box>
      <Box display="grid" gridTemplateColumns="auto">
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
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <Chart
          type="line"
          dateRange={chartDateRange}
          chartData={extraPostsTonalityList}
          extraChartData={mainPostsTonalityList}
          additionalChartData={additionalPostsTonalityList}
          smooth={true}
          height={350}
          loading={false}
          xAxisName={"Time"}
          yAxisName={"Tonality"}
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="auto auto auto"
        alignItems="center"
        justifyContent="center"
        gridColumnGap={25}
      >
        <Box display="flex" alignItems="center">
          <Icon name="Square" css={positiveCss} /> - positive tonality
        </Box>
        <Box display="flex" alignItems="center">
          <Icon name="Square" css={neutralCss} />- neutral tonality
        </Box>
        <Box display="flex" alignItems="center">
          <Icon name="Square" css={negativeCss} />- negative tonality
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button onClick={redirectToSemanticAnalysis}>
          <Box css={reviewButtonCss}>Review Semantic Analysis of Aspects</Box>
        </Button>
        <Button onClick={redirectToTopicAnalysis}>
          <Box css={reviewButtonCss}>Review Topic Analysis</Box>
        </Button>
      </Box>
    </Box>
  );
};
