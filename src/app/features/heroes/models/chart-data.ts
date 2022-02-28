import { ChartType } from './enums/chart';

export interface ChartColumn {
  value: string;
  count: number;
}

export interface ChartDataMap {
  [column: string]: {
    [value: string]: ChartColumn
  }
}

export interface ChartData {
  [column: string]: {
    type: ChartType;
    data: ChartColumn[];
  }
}
