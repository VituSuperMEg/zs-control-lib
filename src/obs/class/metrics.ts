export class Metrics {
  private metrics: Record<string, number> = {};

  increment(metric: string, value: number = 1) {
    if (!this.metrics[metric]) {
      this.metrics[metric] = 0;
    }
    this.metrics[metric] += value;
  }

  getMetric(metric: string): number {
    return this.metrics[metric] || 0;
  }

  getAllMetrics(): Record<string, number> {
    return { ...this.metrics };
  }
}
