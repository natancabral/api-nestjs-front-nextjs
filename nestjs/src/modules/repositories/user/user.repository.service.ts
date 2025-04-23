import { EntityManager } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/mysql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async createAuthAsync(
    data: Partial<UserEntity>,
    personalPassword: string,
    personalSalt: number = 10,
  ): Promise<UserEntity | null> {
    const salt = await bcrypt.genSalt(personalSalt);
    const password = await bcrypt.hash(personalPassword, salt);

    const user = this.userEntity.create({
      ...data,
      password,
      salt,
    });

    if (!user) {
      return null;
    }

    await this.em.persistAndFlush(user);

    return user.toJSON();
  }

  async createAsync(data: Partial<UserEntity>): Promise<UserEntity | null> {
    const user = this.userEntity.create(data);

    if (!user) {
      return null;
    }

    await this.em.persistAndFlush(user.toJSON());

    return user.toJSON();
  }

  async findAllAsync(): Promise<UserEntity[]> {
    const user = await this.userEntity.findAll();
    return user.map((user) => user.toJSON());
  }

  async findOneByIdAsync(id: number): Promise<UserEntity | null> {
    const user = await this.userEntity.findOne({ id });

    if (!user) {
      return null;
    }

    return user.toJSON();
  }

  async findCredentialsAsync(
    search: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const user = await this.userEntity.findOne(search);

    if (!user) {
      return null;
    }

    return user;
  }

  async findOneAsync(search: Partial<UserEntity>): Promise<UserEntity | null> {
    const user = await this.userEntity.findOne(search);

    if (!user) {
      return null;
    }

    return user.toJSON();
  }

  async updateAsync(
    id: number,
    data: Partial<UserEntity>,
  ): Promise<Partial<UserEntity> | null> {
    const user = await this.userEntity.findOne({ id });

    if (!user) {
      return null;
    }

    this.userEntity.assign(user, data);
    await this.em.flush();

    return user.toJSON();
  }

  async deleteAsync(id: number): Promise<boolean> {
    const user = await this.userEntity.findOne({ id });

    if (!user) {
      return false;
    }

    this.em.remove(user);
    await this.em.flush();

    return true;
  }
}
