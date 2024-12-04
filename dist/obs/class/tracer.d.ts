interface Span {
    name: string;
    startTime: number;
    endTime?: number;
    tags: Record<string, any>;
}
export declare class Tracer {
    private spans;
    startSpan(name: string, tags?: Record<string, any>): Span;
    endSpan(span: Span): void;
    getSpans(): Span[];
}
export {};
