import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { AuthGuard } from "./common/guards/auth.guard";
import EnvHelper from "./common/helpers/env.helper";
import typeOrmConfig from "./config/database/typeorm.config";
import { winstonLoggerConfig } from "./config/logger/winston.logger";
import { AuthModule } from "./modules/https/auth/auth.module";
import { HealthCheckModule } from "./modules/https/health/health-check.module";
import { HomeModule } from "./modules/https/home/home.module";
import { UserModule } from "./modules/https/user/user.module";
import { UserRepositoryModule } from "./modules/repositories/user/user.repository.module";
import { RedisCacheModule } from "./modules/services/cache/redis-cache.module";
import { TokenModule } from "./modules/services/token/token.module";

@Module({
  imports: [
    MikroOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonLoggerConfig),
    RedisCacheModule.forRoot({
      host: EnvHelper.getString("CACHE_REDIS_HOST"),
      port: EnvHelper.getNumber("CACHE_REDIS_PORT"),
      ttl: EnvHelper.getTTL("CACHE_REDIS_TTL"),
    }),
    TokenModule.forRoot({
      global: true,
      secret: EnvHelper.getString("JWT_SECRET"),
      expiresIn: EnvHelper.getString("JWT_EXPIRES_IN") || "1d",
    }),
    UserRepositoryModule,
    HomeModule,
    HealthCheckModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
