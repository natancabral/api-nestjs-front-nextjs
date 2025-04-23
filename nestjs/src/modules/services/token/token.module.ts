import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokenConfig } from "./token.config";
import { TokenService } from "./token.service";

@Global()
@Module({
  exports: [TokenService],
  providers: [TokenService],
})
export class TokenModule {
  static provider(config: TokenConfig): Provider[] {
    return [TokenService, { provide: TokenConfig.name, useValue: config }];
  }

  static forRoot(config: TokenConfig): DynamicModule {
    return {
      module: TokenModule,
      imports: [
        JwtModule.register({
          global: config.global,
          secret: config.secret,
          signOptions: {
            expiresIn: config.expiresIn,
          },
        }),
      ],
      providers: [...TokenModule.provider(config)],
      exports: [...TokenModule.provider(config)],
      global: true,
    };
  }
}
