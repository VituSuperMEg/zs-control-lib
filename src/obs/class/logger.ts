export class Logger {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  private log(level: string, message: string, data?: Record<string, unknown>) {
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] [${this.serviceName}] [${level.toUpperCase()}] ${message}`
    );
  }

  info(message: string, data?: Record<string, unknown>) {
    this.log("INFO", message, data);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log("WARN", message, data);
  }


  error(message: string, data?: Record<string, unknown>) {
    this.log("ERROR", message, data);
  }

  debug(message: string, data?: Record<string, unknown>) {
    this.log("DEBUG", message, data);
  }
}
