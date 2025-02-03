import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { ViewUserDto } from 'src/modules/user/dto/view-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, userPassword: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordMatch = bcrypt.compareSync(userPassword, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    return ViewUserDto.fromEntity(user);
  }

  async login(user: User, response: Response) {
    const accessToken = await this.createAccessToken(user.id);
    const refreshToken = await this.createRefreshToken(user.id);

    // save refresh token to db
    await this.userService.updateRefreshToken(user, refreshToken);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(user: RegisterUserRequestDto) {
    const existingUser = await this.userService.findByEmail(user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUserInfo = {
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newUser = await this.userService.register(
      newUserInfo,
      user.companyName,
    );
    return this.login(newUser, null);
  }

  async refresh(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAccessToken(userId: number) {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_TOKEN_EXPIRED_IN,
      },
    );
  }

  async createRefreshToken(userId: number) {
    const tokenId = uuid();
    return this.jwtService.sign(
      { sub: userId, tokenId: tokenId },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_TOKEN_REFRESH_EXPIRED_IN,
      },
    );
  }

  async logout(user: any) {
    await this.userService.updateRefreshToken(user, null);
  }
}
