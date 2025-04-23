import { CacheModule } from "@nestjs/cache-manager";
import { DynamicModule, Module } from "@nestjs/common";
import * as redisStore from "cache-manager-ioredis";
import { RedisCacheConfig } from "./redis-cache.config";
import { RedisCacheService } from "./redis-cache.service";

@Module({
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {
  static forRoot(config: RedisCacheConfig): DynamicModule {
    return {
      module: RedisCacheModule,
      imports: [
        CacheModule.registerAsync({
          useFactory: () => ({
            store: redisStore,
            host: config.host,
            port: config.port,
            ttl: config.ttl,
          }),
          isGlobal: true,
        }),
      ],
      providers: [RedisCacheService],
      exports: [RedisCacheService],
    };
  }
}
