export interface SecretsProviderInterface {
  getSecret(secretName: string): Promise<string>;
}
