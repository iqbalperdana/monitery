import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { User } from 'src/common/entities/user.entity';

export class ViewUserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  role?: string;

  static fromEntity(user: User): ViewUserDto {
    const viewUserDto = new ViewUserDto();
    viewUserDto.id = user.id.toString();
    viewUserDto.name = `${user.firstName} ${user.lastName}`.trim();
    viewUserDto.email = user.email;
    viewUserDto.isActive = user.isVerified;
    // Note: The 'role' field is not present in the User entity, so it's not mapped here
    return viewUserDto;
  }
}
