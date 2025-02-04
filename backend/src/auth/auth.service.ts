import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { ViewUserDto } from 'src/modules/user/dto/view-user.dto';
import { Response } from 'express';
import { TokenPayload } from 'src/common/interfaces/token-payload.interface';

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
    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
      email: user.email,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: `${this.configService.getOrThrow<string>('JWT_TOKEN_EXPIRATION_MS')}ms`,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: `${this.configService.getOrThrow<string>('JWT_TOKEN_REFRESH_EXPIRATION_MS')}ms`,
    });

    // save refresh token to db
    await this.userService.updateRefreshToken(user, refreshToken);

    const accesTokenExpiryDate = new Date();
    accesTokenExpiryDate.setMilliseconds(
      accesTokenExpiryDate.getMilliseconds() +
        parseInt(
          this.configService.getOrThrow<string>('JWT_TOKEN_EXPIRATION_MS'),
        ),
    );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: accesTokenExpiryDate,
    });

    const refreshTokenExpiryDate = new Date();
    refreshTokenExpiryDate.setMilliseconds(
      refreshTokenExpiryDate.getMilliseconds() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_TOKEN_REFRESH_EXPIRATION_MS',
          ),
        ),
    );

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: refreshTokenExpiryDate,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(user: RegisterUserRequestDto, response: Response) {
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
    return this.login(newUser, response);
  }

  async logout(user: any) {
    await this.userService.updateRefreshToken(user, null);
  }
}
