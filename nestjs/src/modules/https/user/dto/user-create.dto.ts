import { IsCPF } from "@root/common/validator/cpf.validator";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  @ApiProperty({
    example: "John Doe",
    description: "Full name",
    required: true,
  })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => String(value).trim())
  @ApiProperty({
    example: "email@email.com.br",
    description: "User email",
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @Length(11, 11)
  @IsCPF()
  @ApiProperty({
    example: "23324734088",
    description: "CPF of the user (11 digits)",
    required: true,
  })
  cpf: string;

  @IsNotEmpty()
  @Length(10, 10)
  @Transform(({ value }) =>
    String(value)
      .trim()
      .replace(/[^0-9-]/g, ""),
  )
  @ApiProperty({
    example: "2000-00-00",
    description: "Date of birth in YYYY-MM-DD format",
    required: true,
  })
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) =>
    String(value)
      .trim()
      .replace(/[^0-9]/g, ""),
  )
  @Length(8, 15)
  @ApiProperty({
    example: "11999999999",
    description: "User phone number",
    required: true,
  })
  phone: string;

  @IsNumber()
  @Max(999)
  @Min(1)
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    example: "55",
    description: "International phone code (1 to 3 characters)",
    type: "number",
    minimum: 1,
    maximum: 999,
    required: true,
  })
  internationalPhoneCode: number;
}
