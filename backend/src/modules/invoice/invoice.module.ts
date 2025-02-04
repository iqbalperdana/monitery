import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/common/entities/invoice.entity';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceItem } from 'src/common/entities/invoice-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    TypeOrmModule.forFeature([InvoiceItem]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
