import { Provider } from "@nestjs/common";
import { AwsSecretsService } from "./aws-secrets.service";
import { EnvSecretsService } from "./env-secrets.service";
import { GoogleSecretsService } from "./google-secrets.service";

export const SecretsProvider: Provider = {
  provide: "SecretsProvider",
  useClass:
    process.env.SECRET_PROVIDER === "google"
      ? GoogleSecretsService
      : process.env.SECRET_PROVIDER === "aws"
        ? AwsSecretsService
        : EnvSecretsService,
};
