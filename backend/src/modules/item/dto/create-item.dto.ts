import { IsString, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  price: number;

  @IsString()
  @IsOptional()
  image_url: string;
}
