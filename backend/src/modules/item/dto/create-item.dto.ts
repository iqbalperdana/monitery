import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  image_url: string;
}
