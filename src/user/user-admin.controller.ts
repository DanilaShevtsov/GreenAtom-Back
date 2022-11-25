import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SaveUserInfoCommand } from "./dto/command/save-user-info.command";
import { JwtAuthGuard } from "./jwt.guard";
import { UserAdminService } from "./user-admin.service";
import { UserService } from "./user.service";

@Controller('admin')
export class UserAdminController {
  constructor(public readonly userAdminService: UserAdminService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async setContactInfo(@Request() req) {
    return await this.userAdminService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt-check')
  async checkJwt(@Request() req) {
    return req.user;
  }
}