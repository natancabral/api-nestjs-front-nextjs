import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "@root/modules/repositories/user/entities/user.entity";
import { TokenConfig } from "./token.config";

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    private readonly jwtService: JwtService,
    @Inject(TokenConfig.name)
    private readonly config: TokenConfig,
  ) {}

  async createToken(payload: Record<string, any>): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.config.secret,
    });
  }

  async createTokenByUser(user: UserEntity): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      createdAt: user.createdAt,
      iat: Math.floor(Date.now() / 1000),
    };

    return this.jwtService.signAsync(payload, {
      secret: this.config.secret,
    });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.config.secret,
        ignoreExpiration: false,
      });
    } catch (error) {
      this.logger.error("Error verifying token", error);
      throw new UnauthorizedException("Token inválido ou expirado.");
    }
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
