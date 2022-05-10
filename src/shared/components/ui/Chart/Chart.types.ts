export type LineChartDataItem = {
  date: Date;
  value: number | null;
};

export type LineChartData = LineChartDataItem[];

export type BarChartDataItem = {
  category: string;
  value: number | null;
};

export type BarChartData = BarChartDataItem[];

export type PieChartDataItem = {
  name: string;
  value: number | null;
  color?: string;
};

export type PieChartData = PieChartDataItem[];

export type ChartDateRange = {
  min?: Date;
  max?: Date;
};
