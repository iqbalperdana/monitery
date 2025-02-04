import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createInvoiceDto: CreateInvoiceDto,
  ) {
    return this.invoiceService.create(user, createInvoiceDto);
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.invoiceService.findAll(user);
  }
}
