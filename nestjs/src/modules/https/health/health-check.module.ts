import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "./health-check.controller";

@Module({
  imports: [TerminusModule, HttpModule],
  exports: [],
  providers: [],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
