import { MetricType } from './metric-type.enum';

export interface MetricModel {
    metric: object;
    metricType: MetricType;
    symbol: string;
}
