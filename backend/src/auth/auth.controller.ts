import { Controller, Request, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('/register')
  async register(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.register(req.body, response);
  }

  @Post('/logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }
}
