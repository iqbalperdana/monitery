import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';

export class CreateInvoiceDto {
  @IsDateString()
  dueDate: string;

  @IsDateString()
  invoiceDate: string;

  @IsNumber()
  total: number;

  @IsString()
  @IsOptional()
  notes: string;

  @IsNotEmpty()
  invoiceItems: CreateInvoiceItemDto[];

  @IsNumber()
  clientId: number;
}
