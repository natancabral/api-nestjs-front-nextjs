import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "../../../common/decorator/public.decorator";
import { AuthService } from "./auth.service";
import { AuthSignUpDto } from "./dtos/auth-sign-up.dto";
import { AuthDto } from "./dtos/auth.dto";

@ApiTags("Authentication")
@Controller("auth")
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "User auth",
    description: "Use email and password.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid credentials",
  })
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body);
  }

  @Post("/sign-up")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "User sign up",
    description: "Register a new user.",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `User with this email or CPF already exists`,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `Error creating user`,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: [
      "Possible internal server errors:",
      "- Fatal generic error",
      "- User not created",
      "- Error generating token",
    ].join("\n"),
  })
  signUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUp(body);
  }
}
