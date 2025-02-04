import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Invoice } from 'src/common/entities/invoice.entity';

@Injectable()
export class InvoiceRepository extends Repository<Invoice> {
  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }
}
