import { Logger } from "./class/logger";
import { Metrics } from "./class/metrics";
import { Tracer } from "./class/tracer";
export interface ZObservabilityConfig {
    serviceName: string;
    version?: string;
}
export interface ZObservability {
    logger: Logger;
    metrics: Metrics;
    tracer: Tracer;
}
