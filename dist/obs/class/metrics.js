"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
class Metrics {
    constructor() {
        this.metrics = {};
    }
    increment(metric, value = 1) {
        if (!this.metrics[metric]) {
            this.metrics[metric] = 0;
        }
        this.metrics[metric] += value;
    }
    getMetric(metric) {
        return this.metrics[metric] || 0;
    }
    getAllMetrics() {
        return Object.assign({}, this.metrics);
    }
}
exports.Metrics = Metrics;
