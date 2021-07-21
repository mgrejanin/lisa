import { MetricDTO } from './metric.dto';

export interface GetMetricsResponseDTO {
    [key: string]: MetricDTO[];
}
