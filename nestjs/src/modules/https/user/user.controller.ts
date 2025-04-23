import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  OmitType,
} from "@nestjs/swagger";
import { AuthGuard } from "../../../common/guards/auth.guard";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserIdDto } from "./dto/user-id.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { UserService } from "./user.service";

@ApiTags("Users")
@Controller("users")
@UseGuards(AuthGuard)
@ApiBearerAuth("bearer")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create user",
    description: "Create a new user.",
  })
  async create(@Body() payload: UserCreateDto) {
    return await this.userService.createAsync(payload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all users",
    description: "Retrieve all users.",
  })
  async findAll() {
    return await this.userService.findAllAsync();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get user by ID",
    description: "Retrieve a user by their ID.",
  })
  async findOne(@Param() params: UserIdDto) {
    return await this.userService.findOneAsync(params.id);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update user",
    description: "Update an existing user.",
  })
  @ApiBody({ type: OmitType(UserCreateDto, ["email", "cpf"]) })
  async update(@Param() params: UserIdDto, @Body() payload: UserUpdateDto) {
    return await this.userService.updateAsync(params.id, payload);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete user",
    description: "Delete a user by their ID.",
  })
  async remove(@Param() params: UserIdDto) {
    return await this.userService.removeAsync(params.id);
  }
}
