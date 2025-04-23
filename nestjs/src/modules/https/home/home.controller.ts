import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../../../common/decorator/public.decorator";

@ApiTags("Read Me")
@Controller("read-me")
export class HomeController {
  @Public()
  @Get()
  hi() {
    return "Sorry. Read README.md file";
  }
}
