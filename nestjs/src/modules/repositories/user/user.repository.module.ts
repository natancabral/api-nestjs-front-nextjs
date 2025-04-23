import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { UserRepositoryService } from "./user.repository.service";

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService, MikroOrmModule],
  controllers: [],
})
export class UserRepositoryModule {}
