import { Controller, Post, Body, HttpCode, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { ChangePassDto } from './dto/change-pass.dto';

@ApiBearerAuth()
@ApiTags('users')
//@UseGuards(JwtAuthGuard)
@Controller('oberon360api/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('changePassword')
  changePassword(@Body() changePassDto: ChangePassDto, @Request() req) {
    return this.userService.changePassword(changePassDto, req.user);
  }
}