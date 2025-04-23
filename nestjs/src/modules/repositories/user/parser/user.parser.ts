import { UserEntity } from "../entities/user.entity";

export class UserParser {
  static execute(user: UserEntity): UserEntity {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      cpf: user.cpf,
      birthDate: user.birthDate,
      phone: user.phone,
      internationalPhoneCode: user.internationalPhoneCode,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      toJSON() {
        return UserParser.execute(this);
      },
      toToken() {
        return UserParser.execute(this);
      },
    };
  }

  static toToken(user: UserEntity): UserEntity {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      toJSON() {
        return UserParser.execute(this);
      },
      toToken() {
        return UserParser.toToken(this);
      },
    };
  }
}
