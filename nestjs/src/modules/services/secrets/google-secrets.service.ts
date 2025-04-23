import { Injectable } from "@nestjs/common";
import { SecretsProviderInterface } from "./secrets-provider.interface";

@Injectable()
export class GoogleSecretsService implements SecretsProviderInterface {
  async getSecret(secretName: string): Promise<string> {
    return "mock-google-secret-value";
  }
}
