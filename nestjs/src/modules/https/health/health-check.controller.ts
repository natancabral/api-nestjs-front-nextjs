import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  MikroOrmHealthIndicator,
} from "@nestjs/terminus";
import EnvHelper from "@root/common/helpers/env.helper";
import { Public } from "../../../common/decorator/public.decorator";

@ApiTags("Health Check")
@Controller("healthcheck")
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private readonly mikroOrmIndicator: MikroOrmHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      async () =>
        this.mikroOrmIndicator.pingCheck(EnvHelper.getString("DATABASE_TYPE")),
    ]);
  }
}
