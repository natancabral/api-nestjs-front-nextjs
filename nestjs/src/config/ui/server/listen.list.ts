import { ApplicationEnvironment } from "@root/config/environment/application.env";
import { UiEnvironment } from "@root/config/environment/ui.env";
import { TerminalColors } from "./colors";
export const listen = [
  `UTC: ${new Date().toUTCString()}`,
  `PT-BR: ${new Date().toLocaleTimeString("pt-BR")}`,
  `Server is running on:${TerminalColors.reset}`,
  `http://localhost:${ApplicationEnvironment.port}`,
  `Environment: ${TerminalColors.yellow}${ApplicationEnvironment.env}`,
  `Swagger: http://localhost:${ApplicationEnvironment.port}${UiEnvironment.swaggerPath}`,
  `Health Check: http://localhost:${ApplicationEnvironment.port}${ApplicationEnvironment.appPrefix}/healthcheck`,
];
