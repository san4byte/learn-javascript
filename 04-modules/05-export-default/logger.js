// logger.js - Modul sistem logging aplikasi
// 1. Named exports: konstanta level log
export const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

export const APP_VERSION = '2.5.0';

// 2. Default export: Class Logger utama (hanya 1 default export per file)
export default class Logger {
  constructor(serviceName) {
    this.serviceName = serviceName;
  }

  log(message, level = LOG_LEVELS.INFO) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.serviceName}]: ${message}`;
  }
}
