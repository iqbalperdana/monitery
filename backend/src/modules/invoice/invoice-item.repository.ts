import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InvoiceItem } from 'src/common/entities/invoice-item.entity';

@Injectable()
export class InvoiceItemRepository extends Repository<InvoiceItem> {
  constructor(private dataSource: DataSource) {
    super(InvoiceItem, dataSource.createEntityManager());
  }
}
