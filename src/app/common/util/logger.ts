import {environment} from '../../../environments/environment';

export class Log {

  /**
   * Logs a message with tag and adata to the console
   * @param tag - Tag to be used
   * @param message - Message to be logged
   * @param data - Data to be logged
   * @param level - Loglevel
   */
  private static logMessage(tag: string, message: string, data: any, level: string) {
    const logString = `[${tag}] ${message}`;
    if (data) {
      console[level](logString, data);
    } else {
      console[level](logString);
    }
  }

  /**
   * Log to debug log
   * @param tag - Tag to be used
   * @param message - Message to be logged
   * @param data - Data to be logged
   */
  static d(tag: string, message: string, data?: any) {
    if (!environment.production) {
      this.logMessage(tag, message, data, 'debug');
    }
  }

  /**
   * Log to error log
   * @param tag - Tag to be used
   * @param message - Message to be logged
   * @param data - Data to be logged
   */
  static e(tag: string, message: string, data?: any) {
    this.logMessage(tag, message, data, 'error');
  }
}


