import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";

export const winstonLoggerConfig = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({
        timestamp,
        level,
        message,
        context,
      }: {
        timestamp: string;
        level: string;
        message: string;
        context?: string;
      }) => {
        return `[${timestamp}] [${level}]${context ? " [" + context + "]" : ""} ${message}`;
      },
    ),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        nestWinstonModuleUtilities.format.nestLike("NestApp", {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
