import { Injectable } from "@nestjs/common";
import EnvHelper from "@root/common/helpers/env.helper";
import { SecretsProviderInterface } from "./secrets-provider.interface";

@Injectable()
export class EnvSecretsService implements SecretsProviderInterface {
  async getSecret(secretName: string): Promise<string> {
    return EnvHelper.getString(secretName);
  }
}
