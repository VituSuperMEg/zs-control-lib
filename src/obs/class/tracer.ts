interface Span {
  name: string;
  startTime: number;
  endTime?: number;
  tags: Record<string, any>;
}

export class Tracer {
  private spans: Span[] = [];

  startSpan(name: string, tags: Record<string, any> = {}): Span {
    const span: Span = { name, startTime: Date.now(), tags };
    this.spans.push(span);
    return span;
  }

  endSpan(span: Span) {
    span.endTime = Date.now();
  }

  getSpans(): Span[] {
    return this.spans;
  }
}
