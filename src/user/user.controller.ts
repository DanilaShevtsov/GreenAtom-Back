import { Body, Controller, Post } from "@nestjs/common";
import { SaveUserInfoCommand } from "./dto/command/save-user-info.command";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Post('set-contact-info')
  async setContactInfo(@Body() query: SaveUserInfoCommand) {
    return await this.userService.store(query);
  }
}