import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { UserParser } from "../parser/user.parser";

@Entity({ tableName: "users" })
export class UserEntity {
  @PrimaryKey()
  id?: number;

  @Property()
  fullName?: string;

  @Property({ unique: true })
  email?: string;

  @Property({ unique: true, length: 11 })
  cpf?: string;

  @Property({ length: 10 })
  birthDate?: string;

  @Property()
  phone?: string;

  @Property()
  internationalPhoneCode?: number;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property()
  password?: string;

  @Property()
  salt?: string;

  toJSON() {
    return UserParser.execute(this);
  }

  toToken() {
    return UserParser.toToken(this);
  }
}
