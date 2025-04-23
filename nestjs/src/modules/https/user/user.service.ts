import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { UserEntity } from "@root/modules/repositories/user/entities/user.entity";
import { UserRepositoryService } from "@root/modules/repositories/user/user.repository.service";
import { RedisCacheService } from "@root/modules/services/cache/redis-cache.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserUpdateDto } from "./dto/user-update.dto";

@Injectable()
export class UserService {
  private readonly cacheKey = (key?: string | number) => `users:${key}`;

  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly cacheService: RedisCacheService,
  ) {}

  async createAsync(createUserDto: UserCreateDto): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createAsync(createUserDto)
      .catch((error) => {
        if (error instanceof Error && "message" in error) {
          if (error.message.includes("duplicate key value")) {
            throw new ConflictException(
              `User with this email or CPF already exists. ${createUserDto.cpf}`,
            );
          }

          throw new BadRequestException(
            `Error creating user: ${error.message?.toString() || "Unknown error"}`,
          );
        }

        throw new InternalServerErrorException(
          `Create generic error: ${JSON.stringify(error)}`,
        );
      });

    await this.cacheService.del(this.cacheKey("all"));
    return user;
  }

  async findAllAsync(): Promise<UserEntity[]> {
    const cached = await this.cacheService.get<UserEntity[]>(
      this.cacheKey("all"),
    );

    if (cached) {
      return cached;
    }

    const users = await this.userRepository.findAllAsync();
    await this.cacheService.set(this.cacheKey("all"), users);

    return users;
  }

  async findOneAsync(id: number): Promise<UserEntity> {
    const cached = await this.cacheService.get<UserEntity>(this.cacheKey(id));

    if (cached) {
      return cached;
    }

    const user = await this.userRepository
      .findOneByIdAsync(id)
      .catch((error) => {
        if (error instanceof Error && "message" in error) {
          throw new NotFoundException(
            `Error finding user: ${id}` +
              (error?.message?.toString() || "Unknown error"),
          );
        }

        throw new InternalServerErrorException(
          `Finding generic error: ${JSON.stringify(error)}`,
        );
      });

    if (!user) {
      throw new NotFoundException(`User not found. Id: ${id}`);
    }

    await this.cacheService.set(this.cacheKey(id), user);

    return user;
  }

  async updateAsync(
    id: number,
    updateUserDto: UserUpdateDto,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository
      .updateAsync(id, updateUserDto)
      .catch((error) => {
        if (error instanceof Error && "message" in error) {
          throw new NotFoundException(
            "Updated error" + (error?.message?.toString() || "Unknown error"),
          );
        }

        throw new InternalServerErrorException(
          `Update generic error: ${JSON.stringify(error)}`,
        );
      });

    if (!user) {
      throw new NotFoundException(`User not found. Id: ${id}`);
    }

    await this.cacheService.del(this.cacheKey(id));
    await this.cacheService.del(this.cacheKey("all"));

    return user as UserEntity;
  }

  async removeAsync(id: number): Promise<boolean | null> {
    const remove = await this.userRepository.deleteAsync(id).catch((error) => {
      if (error instanceof Error && "message" in error) {
        throw new NotFoundException(
          "Deleted error" + (error?.message?.toString() || "Unknown error"),
        );
      }

      throw new InternalServerErrorException(
        `Delete generic error: ${JSON.stringify(error)}`,
      );
    });

    if (!remove) {
      throw new NotFoundException(`User not found. Id: ${id}`);
    }

    await this.cacheService.del(this.cacheKey(id));
    await this.cacheService.del(this.cacheKey("all"));

    return remove;
  }
}
