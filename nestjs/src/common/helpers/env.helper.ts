import { Logger } from "@nestjs/common";

export interface IEnvConfig {
  required: boolean;
}

export default class EnvHelper {
  private static readonly logger = new Logger(EnvHelper.name);

  private static getEnv(
    variable: string,
    config?: IEnvConfig,
  ): string | undefined {
    const env = process.env?.[variable];

    if (!env && config?.required !== false) {
      this.warning(variable, config);
    }

    return env?.trim();
  }

  static getString(variable: string, config?: IEnvConfig): string {
    return EnvHelper.getEnv(variable, config) || "";
  }

  static getBool(variable: string, config?: IEnvConfig): boolean {
    const input = EnvHelper.getEnv(variable, config) || undefined;

    const normalized = input?.trim()?.toLowerCase();

    if (normalized === "true") return true;

    return false;
  }

  static getNumber(variable: string, config?: IEnvConfig): number {
    const input = EnvHelper.getEnv(variable, config) || "";
    return parseInt(input, 10);
  }

  /**
   * Parses a human-readable time string into total seconds.
   *
   * @param {string} input - The time string to parse. Supports days (d), hours (h), minutes (m), and seconds (s).
   *                          Example formats: "2d", "5h 10m", "30s", "1d 12h 30m".
   * @returns {number} The total time in seconds.
   *
   * @example
   * parseSeconds("2d 5h 10m 30s"); // 187830
   * @example
   * parseSeconds("1h 15m"); // 4500
   * @example
   * parseSeconds("45s"); // 45
   */
  static getTTL(variable: string, config?: IEnvConfig): number {
    const input = EnvHelper.getEnv(variable, config);

    if (!input) return -1;

    const regex = /(\d+)([smhd])/g;
    let totalSeconds = 0;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(input)) !== null && match !== null) {
      const value = parseInt(match[1], 10);
      const unit = match[2];

      switch (unit) {
        case "s":
          totalSeconds += value;
          break;
        case "m":
          totalSeconds += value * 60;
          break;
        case "h":
          totalSeconds += value * 60 * 60;
          break;
        case "d":
          totalSeconds += value * 60 * 60 * 24;
          break;
      }
    }

    return totalSeconds;
  }

  static warning(variable: string, config?: IEnvConfig) {
    const message = `Not found process.env.${variable}`;

    if (config?.required === undefined || config?.required === true) {
      this.logger.error(message);
      throw new Error(message);
    } else {
      this.logger.warn(message);
    }
  }
}
