
import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsString()
  @IsOptional()
  verificationToken?: string;

  @IsString()
  @IsOptional()
  resetPasswordToken?: string;

  @IsOptional()
  resetPasswordExpires?: Date;

  @IsOptional()
  tenantId?: number;
}
