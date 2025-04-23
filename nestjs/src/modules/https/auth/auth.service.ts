import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { UserRepositoryService } from "@root/modules/repositories/user/user.repository.service";
import { TokenService } from "@root/modules/services/token/token.service";
import * as bcrypt from "bcrypt";
import { AuthSignUpDto } from "./dtos/auth-sign-up.dto";
import { AuthDto } from "./dtos/auth.dto";
import { IAuthResponse } from "./interfaces/auth-response.interface";

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepositoryService,
  ) {}

  async signIn(auth: AuthDto): Promise<IAuthResponse> {
    const user = await this.userRepository.findCredentialsAsync({
      email: auth.email,
    });

    if (!user || !user.password) {
      this.logger.error("User not found or password not set");
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(auth.password, user.password);

    if (!isPasswordValid) {
      this.logger.error("Invalid password");
      throw new UnauthorizedException("Invalid credentials");
    }

    const userParsed = user.toToken();

    return {
      token: await this.tokenService.createTokenByUser(userParsed),
      user: userParsed,
    };
  }

  async signUp(signUp: AuthSignUpDto): Promise<IAuthResponse> {
    const user = await this.userRepository
      .createAuthAsync(signUp, signUp.password)
      .catch((error) => {
        if (error instanceof Error && "message" in error) {
          this.logger.error(
            `Error creating user: ${error.message}`,
            error.stack,
          );

          if (error.message?.toLowerCase().includes("duplicate")) {
            throw new ConflictException(
              `User with this email or CPF already exists. ${signUp.cpf}`,
            );
          }

          throw new BadRequestException(`Error creating user`);
        }

        this.logger.error(error);
        throw new InternalServerErrorException(`Fatal generic error`);
      });

    if (!user) {
      throw new InternalServerErrorException("User not created");
    }

    const userParsed = user.toToken();

    try {
      return {
        token: await this.tokenService.createTokenByUser(user),
        user: userParsed,
      };
    } catch (error) {
      if (error instanceof Error && "message" in error) {
        this.logger.error(
          `Error generating token: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(error);
      }

      throw new InternalServerErrorException(`Error generating token`);
    }
  }
}
