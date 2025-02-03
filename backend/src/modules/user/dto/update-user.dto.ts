
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  verificationToken?: string;

  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @IsOptional()
  resetPasswordExpires?: Date;

  @IsOptional()
  tenantId?: number;
}
