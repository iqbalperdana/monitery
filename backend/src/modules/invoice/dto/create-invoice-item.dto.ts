import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image_url: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  itemId: number;
}
