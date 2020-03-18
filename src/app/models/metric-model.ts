import { MetricType } from './metric-type.enum';

export interface MetricModel {
    metric: any;
    metricType: MetricType;
    symbol: string;
}
