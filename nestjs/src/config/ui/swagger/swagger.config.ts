import { INestApplication } from "@nestjs/common";
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { ApplicationEnvironment } from "@root/config/environment/application.env";
import { UiEnvironment } from "@root/config/environment/ui.env";

export class SwaggerConfig {
  public static AddSwaggerConfiguration(app: INestApplication) {
    const config = new DocumentBuilder()
      .addSecurity("bearer", {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      })
      .addTag("User AMBEV")
      .setTitle("API - User AMBEV (Test 24h)")
      .setVersion("0.1.1")
      .build();

    return SwaggerModule.createDocument(app, config);
  }

  public static UseSwaggerSetup(
    app: INestApplication,
    document: OpenAPIObject,
  ) {
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: ApplicationEnvironment.env + " - User AMBEV (Test 24h)",
    };

    SwaggerModule.setup(
      UiEnvironment.swaggerPath,
      app,
      document,
      customOptions,
    );
  }
}
