import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { LineChart, BarChart, PieChart, ScatterChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import type { EChartsOption } from "echarts";
import _ from "lodash";
import { LegendComponent } from "echarts/components";

import type { SxProp } from "shared/types/styles";
import { Preloader } from "shared/components/ui";

import type {
  LineChartData,
  BarChartData,
  PieChartData,
  ChartDateRange,
} from "./Chart.types";

echarts.use([
  SVGRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  ScatterChart,
  LegendComponent,
]);

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
  | {
      type: "line";
      chartData?: LineChartData;
      extraChartData?: LineChartData;
      additionalChartData?: LineChartData;
    }
  | {
      type: "bar";
      chartData?: BarChartData;
      extraChartData?: BarChartData;
      additionalChartData?: BarChartData;
    }
  | {
      type: "pie";
      chartData?: PieChartData;
      extraChartData?: PieChartData;
      additionalChartData?: PieChartData;
    }
  | {
      type: "bubble";
      chartData?: EChartsOption;
      extraChartData?: any;
      additionalChartData?: any;
    }
  | {
      type: "customBar";
      chartData?: EChartsOption;
      extraChartData?: any;
      additionalChartData?: any;
    };

type ChartProps = {
  xAxisType?: "value" | "time";
  xAxisShowLabel?: boolean;
  color?: string;
  height?: number;
  width?: number;
  overrideOptions?: EChartsOption;
  dateRange?: ChartDateRange;
  xAxisName?: string;
  yAxisName?: string;
  loading?: boolean;
  smooth?: boolean;
  categoryName?: string;
  mainLabelColor?: any;
  otherLabelColor?: any;
};

export const Chart: React.FC<ChartProps & ChartPropsVariants> = ({
  type,
  xAxisType = "time",
  xAxisShowLabel = true,
  chartData,
  extraChartData,
  additionalChartData,
  color = "#0089ff",
  height = 250,
  width,
  overrideOptions,
  dateRange,
  xAxisName = "",
  yAxisName = "",
  loading = false,
  smooth = false,
  categoryName = "category",
  mainLabelColor,
  otherLabelColor,
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
        series: [
          {
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
            smooth,
          },
          {
            type,
            lineStyle: {
              color: "green",
            },
            symbol: "none",
            endLabel: {
              show: true,
              color: "green",
              formatter: ({ value }) =>
                _.isArray(value) ? value[1].toString() : value.toString(),
            },
            animation: true,
            data: extraChartData?.map((point) => ({
              name: point.date.toString(),
              value: [point.date, point.value as number],
            })),
            smooth,
          },
          {
            type,
            lineStyle: {
              color: "red",
            },
            symbol: "none",
            endLabel: {
              show: true,
              color: "red",
              formatter: ({ value }) =>
                _.isArray(value) ? value[1].toString() : value.toString(),
            },
            animation: true,
            data: additionalChartData?.map((point) => ({
              name: point.date.toString(),
              value: [point.date, point.value as number],
            })),
            smooth,
          },
        ],
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          name: yAxisName,
          nameTextStyle: {
            color: theme.palette.warning.light,
            fontSize: 14,
          },
        },
        legend: {},
        series: [
          {
            type,
            color: mainLabelColor,
            stack: "total",
            emphasis: {
              focus: "series",
            },
            showBackground: false,
            label: {
              show: true,
              color: mainLabelColor,
              position: "left",
            },
            animation: false,
            data: chartData.map((point) => ({
              name: categoryName,
              value: [_.capitalize(point.category), point.value as number],
            })),
          },
          {
            type,
            color: otherLabelColor,
            stack: "total",
            emphasis: {
              focus: "series",
            },
            showBackground: false,
            label: {
              show: true,
              color: otherLabelColor,
              position: "left",
            },
            animation: false,
            data: extraChartData?.map((point) => ({
              name: categoryName,
              value: [_.capitalize(point.category), point.value as number],
            })),
          },
        ],
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
          avoidLabelOverlap: true,
          label: {
            fontSize: 12,
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

    if (type === "bubble") {
      dataOptions = chartData;
    }

    if (type === "customBar") {
      dataOptions = chartData;
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
    additionalChartData,
    categoryName,
    chartData,
    color,
    dateRange,
    extraChartData,
    overrideOptions,
    smooth,
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
      <Box display="flex" height={height} width={width} alignItems="center">
        <Preloader />
      </Box>
    );
  }

  if (_.isNil(chartOptions)) {
    return (
      <Box display="flex" height={height} width={width} alignItems="center">
        <Typography>Wrong chart data!</Typography>
      </Box>
    );
  }

  return (
    <Box height={height} minWidth={width} sx={boxStyles}>
      <ReactEChartsCore
        echarts={echarts}
        option={chartOptions}
        notMerge={false}
        lazyUpdate={true}
        className="test"
      />
    </Box>
  );
};
