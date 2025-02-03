import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @Post('/logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @Post('/refresh')
  async refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
