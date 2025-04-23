import EnvHelper, { IEnvConfig } from "@root/common/helpers/env.helper";

export class Environment {
  public str(name: string, options?: IEnvConfig): string {
    return EnvHelper.getString(name, options);
  }

  public bool(name: string, options?: IEnvConfig): boolean {
    return EnvHelper.getBool(name, options);
  }

  public num(name: string, options?: IEnvConfig): number {
    return EnvHelper.getNumber(name, options);
  }

  public ttl(name: string, options?: IEnvConfig): number {
    return EnvHelper.getTTL(name, options);
  }

  public static str(name: string, options?: IEnvConfig): string {
    return EnvHelper.getString(name, options);
  }

  public static bool(name: string, options?: IEnvConfig): boolean {
    return EnvHelper.getBool(name, options);
  }

  public static num(name: string, options?: IEnvConfig): number {
    return EnvHelper.getNumber(name, options);
  }

  public static ttl(name: string, options?: IEnvConfig): number {
    return EnvHelper.getTTL(name, options);
  }
}
