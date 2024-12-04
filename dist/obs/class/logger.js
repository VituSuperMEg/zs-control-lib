"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(serviceName) {
        this.serviceName = serviceName;
    }
    log(level, message, data) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${this.serviceName}] [${level.toUpperCase()}] ${message}`);
    }
    info(message, data) {
        this.log("INFO", message, data);
    }
    warn(message, data) {
        this.log("WARN", message, data);
    }
    error(message, data) {
        this.log("ERROR", message, data);
    }
    debug(message, data) {
        this.log("DEBUG", message, data);
    }
}
exports.Logger = Logger;
