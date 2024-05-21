import { Controller, UseGuards, Post, HttpCode, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import IResponse from '../../types/IResponse';

@Controller('auth')
@ApiTags('Core/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req): Promise<IResponse> {
    return this.authService.login(req.user);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('validate')
  @HttpCode(200)
  async validate(@Request() req): Promise<IResponse> {
    return { status: 'success', data: req.user };
  }
}
