export interface IChart {
  labels?: string[];
  datasets?: IDataSet[];
}

export interface IDataSet {
  type: 'line' | 'bar';
  label: string;
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  data: number[];
}
