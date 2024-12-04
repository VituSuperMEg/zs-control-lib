"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracer = void 0;
class Tracer {
    constructor() {
        this.spans = [];
    }
    startSpan(name, tags = {}) {
        const span = { name, startTime: Date.now(), tags };
        this.spans.push(span);
        return span;
    }
    endSpan(span) {
        span.endTime = Date.now();
    }
    getSpans() {
        return this.spans;
    }
}
exports.Tracer = Tracer;
