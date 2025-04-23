import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserCreateDto } from "../../user/dto/user-create.dto";

export class AuthSignUpDto extends UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  @MaxLength(32, { message: "Password must be at most 32 characters long." })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: "Password must contain at least one letter and one number.",
  })
  @ApiProperty({
    description: "User password",
    example: "123465Test!",
    required: true,
  })
  password: string;
}
