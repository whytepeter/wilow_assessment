
export interface DataPoint {
  date: string;
  "2024": number;
  "2025": number;
}

export interface ChartData {
  metric: string;
  currency: string;
  data: DataPoint[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
  tension: number;
  pointRadius: number;
  pointHoverRadius: number;
  pointHoverBackgroundColor: string;
  pointHoverBorderColor: string;
  pointHoverBorderWidth: number;
}

export type ChartLoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ChartError {
  message: string;
  code?: string;
}
