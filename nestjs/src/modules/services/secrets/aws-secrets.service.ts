import { Injectable } from "@nestjs/common";
import { SecretsProviderInterface } from "./secrets-provider.interface";

@Injectable()
export class AwsSecretsService implements SecretsProviderInterface {
  async getSecret(secretName: string): Promise<string> {
    return "mock-aws-secret-value";
  }
}
