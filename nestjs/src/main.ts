// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-require-imports
require("dotenv").config();
import { ApplicationEnvironment } from "@config/environment/application.env";
import { listen } from "@config/ui/server/listen.list";
import { UIModule } from "@config/ui/ui.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import "reflect-metadata";
import { AppModule } from "./app.module";
import EnvHelper from "./common/helpers/env.helper";

async function bootstrap(): Promise<void> {
  const logger = new Logger(ApplicationEnvironment.appName);
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: EnvHelper.getString("CACHE_REDIS_HOST"),
      port: EnvHelper.getNumber("CACHE_REDIS_PORT"),
    },
  });

  app.enableCors({
    origin: ApplicationEnvironment.isProduction
      ? ApplicationEnvironment.corsOrigin
      : "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix(ApplicationEnvironment.appPrefix);
  app.enableVersioning();

  UIModule.init(app);

  await app.listen(ApplicationEnvironment.port).then(() => {
    listen.map((item) => logger.debug(item));
  });

  await app.startAllMicroservices().catch((error) => {
    logger.error(`Error starting microservice: ${error}`);
  });
}
bootstrap().catch((error) => {
  throw new Error(`Error starting server: ${error}`);
});
