import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import type { EChartsOption } from "echarts";
import _ from "lodash";

import type { SxProp } from "shared/types/styles";
import { Preloader } from "shared/components/ui";

import type {
  LineChartData,
  BarChartData,
  PieChartData,
  ChartDateRange,
} from "./Chart.types";
import { DateTime } from "luxon";

echarts.use([SVGRenderer, LineChart, BarChart, PieChart, GridComponent]);

const boxStyles: SxProp = {
  width: "100%",
  overflow: "hidden",
  "& > *": {
    width: "100%",
    height: "100% !important",
    "& > *": {
      width: "100% !important",
      height: "100% !important",
    },
  },
};

type ChartPropsVariants =
  | { type: "line"; chartData?: LineChartData }
  | { type: "bar"; chartData?: BarChartData }
  | { type: "pie"; chartData?: PieChartData };

type ChartProps = {
  xAxisType?: "value" | "time";
  xAxisShowLabel?: boolean;
  color?: string;
  height?: number;
  overrideOptions?: EChartsOption;
  dateRange?: ChartDateRange;
  xAxisName?: string;
  yAxisName?: string;
  loading?: boolean;
};

export const Chart: React.FC<ChartProps & ChartPropsVariants> = ({
  type,
  xAxisType = "time",
  xAxisShowLabel = true,
  chartData,
  color = "#0089ff",
  height = 250,
  overrideOptions,
  dateRange,
  xAxisName = "",
  yAxisName = "",
  loading = false,
}) => {
  const theme = useTheme();
  const chartOptions = React.useMemo((): EChartsOption | undefined => {
    if (_.isNil(chartData)) {
      return undefined;
    }

    let dataOptions: EChartsOption = {};

    if (type === "line") {
      dataOptions = {
        xAxis: {
          type: xAxisType,
          splitLine: {
            show: false,
          },
          name: xAxisName,
          nameTextStyle: {
            color: theme.palette.info.light,
            fontSize: 14,
          },
          axisLabel: {
            show: xAxisShowLabel,
          },
          ...dateRange,
        },
        yAxis: {
          name: yAxisName,
          nameTextStyle: {
            color: theme.palette.warning.light,
            fontSize: 14,
            verticalAlign: "middle",
          },
        },
        series: {
          type,
          lineStyle: {
            color,
          },
          symbol: "none",
          endLabel: {
            show: true,
            color,
            formatter: ({ value }) =>
              _.isArray(value) ? value[1].toString() : value.toString(),
          },
          animation: true,
          data: chartData.map((point) => ({
            name: point.date.toString(),
            value: [point.date, point.value as number],
          })),
        },
      };
    }

    const isBarChart = type === "bar";

    if (type === "bar") {
      dataOptions = {
        xAxis: {
          type: "category",
          splitLine: {
            show: false,
          },
          name: xAxisName,
          nameTextStyle: {
            color: theme.palette.info.light,
            fontSize: 14,
          },
          axisLabel: {
            color: "#000",
            padding: 5,
          },
          axisTick: {
            interval: "auto",
          },
        },
        yAxis: {
          name: yAxisName,
          nameTextStyle: {
            color: theme.palette.warning.light,
            fontSize: 14,
          },
        },
        series: {
          type,
          color,
          showBackground: false,
          label: {
            show: true,
            color,
            position: "top",
          },
          animation: false,
          data: chartData.map((point) => ({
            name: "category",
            value: [_.capitalize(point.category), point.value as number],
          })),
        },
      };
    }

    if (type === "pie") {
      dataOptions = {
        xAxis: {
          type: "category",
          show: false,
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "#000",
            padding: 1,
          },
        },
        series: {
          type,
          radius: ["0%", "65%"], // it's been 40/85
          avoidLabelOverlap: false,
          label: {
            fontSize: 20,
            show: true,
            color: "darkblue",
          },
          animation: true,
          color: chartData
            .map((point) => point.color)
            .filter(Boolean) as string[],
          data: chartData.map((point) => ({
            name: point.name,
            value: point.value as number,
          })),
        },
      };
    }

    return {
      grid: {
        top: isBarChart ? 30 : 20,
        bottom: xAxisShowLabel ? 30 : 15,
        left: 80, //40
        right: 80, //45
        containLabel: true,
      },
      animation: false,
      yAxis: {
        type: "value",
        splitLine: {
          show: isBarChart,
        },
      },
      ...dataOptions,
      ...overrideOptions,
    };
  }, [
    chartData,
    color,
    dateRange,
    overrideOptions,
    theme.palette.info.light,
    theme.palette.warning.light,
    type,
    xAxisName,
    xAxisShowLabel,
    xAxisType,
    yAxisName,
  ]);

  if (loading) {
    return (
      <Box display="flex" height={height} alignItems="center">
        <Preloader />
      </Box>
    );
  }

  if (_.isNil(chartOptions)) {
    return (
      <Box display="flex" height={height} alignItems="center">
        <Typography>Wrong chart data!</Typography>
      </Box>
    );
  }

  return (
    <Box height={height} sx={boxStyles}>
      <ReactEChartsCore
        echarts={echarts}
        option={chartOptions}
        notMerge={true}
        lazyUpdate={true}
        className="test"
      />
    </Box>
  );
};
