import { EnvironmentEnum } from "@root/common/enums/environment.enum";
import { Environment } from "./environment.class";

export class ApplicationEnvironment extends Environment {
  public static readonly appName = this.str("APP_NAME");
  public static readonly appPrefix = this.str("APP_PREFIX", {
    required: false,
  });
  public static readonly debug = this.str("DEBUG", {
    required: false,
  });
  public static readonly port = this.num("PORT") || 3000;
  public static readonly env = (this.str("ENV") || "").toUpperCase();
  public static readonly isProduction =
    this.env === EnvironmentEnum.PRD.toString();
  public static readonly corsOrigin = this.str("CORS_ORIGIN").split(",");
}
