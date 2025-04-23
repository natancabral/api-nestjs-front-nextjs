import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "@root/modules/repositories/user/user.repository.module";
import { TokenModule } from "@root/modules/services/token/token.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserRepositoryModule, TokenModule],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
