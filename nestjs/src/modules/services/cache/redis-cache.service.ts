import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RedisCacheService {
  private logger = new Logger(RedisCacheService.name);
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      return ((await this.cacheManager.get<T>(key)) as T) || null;
    } catch (error) {
      this.logger.error(error);
    }
    return null;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    try {
      await this.cacheManager.set<T>(key, value, ttlSeconds ?? 60 * 5);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.cacheManager.clear();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
