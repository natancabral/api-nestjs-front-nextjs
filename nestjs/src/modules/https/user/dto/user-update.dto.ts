import { OmitType } from "@nestjs/mapped-types";
import { UserCreateDto } from "./user-create.dto";

export class UserUpdateDto extends OmitType(UserCreateDto, ["email", "cpf"]) {}
