export declare class Metrics {
    private metrics;
    increment(metric: string, value?: number): void;
    getMetric(metric: string): number;
    getAllMetrics(): Record<string, number>;
}
