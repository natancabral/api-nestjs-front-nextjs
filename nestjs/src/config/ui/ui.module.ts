import { INestApplication, Module } from "@nestjs/common";

import { ApplicationEnvironment } from "../environment/application.env";
import { SwaggerConfig } from "./swagger/swagger.config";

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class UIModule {
  public static init(app: INestApplication) {
    if (ApplicationEnvironment.isProduction) {
      return;
    }

    const document = SwaggerConfig.AddSwaggerConfiguration(app);
    SwaggerConfig.UseSwaggerSetup(app, document);
  }
}
