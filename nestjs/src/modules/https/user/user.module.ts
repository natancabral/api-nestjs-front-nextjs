import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "@root/modules/repositories/user/user.repository.module";
import { RedisCacheModule } from "@root/modules/services/cache/redis-cache.module";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [UserRepositoryModule, AuthModule, RedisCacheModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
