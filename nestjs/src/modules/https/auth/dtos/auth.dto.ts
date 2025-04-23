import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => String(value).trim())
  @ApiProperty({
    description: "User email",
    example: "email@email.com.br",
    required: true,
  })
  email: string;

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
