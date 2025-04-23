import { Environment } from "./environment.class";

export class UiEnvironment extends Environment {
  public static readonly swaggerPath = this.str("SWAGGER_PATH");
}
