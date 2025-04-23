import { UserEntity } from "@root/modules/repositories/user/entities/user.entity";

export interface IAuthResponse {
  token: string;
  user?: Partial<UserEntity>;
}
