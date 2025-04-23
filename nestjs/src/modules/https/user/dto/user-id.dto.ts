import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UserIdDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @ApiProperty({
    description: "User ID",
    example: 1,
  })
  id: number;
}
