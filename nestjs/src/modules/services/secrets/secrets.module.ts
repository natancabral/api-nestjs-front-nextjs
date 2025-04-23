import { Module } from "@nestjs/common";
import { AwsSecretsService } from "./aws-secrets.service";
import { EnvSecretsService } from "./env-secrets.service";
import { GoogleSecretsService } from "./google-secrets.service";
import { SecretsProvider } from "./secrets.provider";

@Module({
  providers: [
    SecretsProvider,
    AwsSecretsService,
    GoogleSecretsService,
    EnvSecretsService,
  ],
  exports: [SecretsProvider],
})
export class SecretsModule {}
