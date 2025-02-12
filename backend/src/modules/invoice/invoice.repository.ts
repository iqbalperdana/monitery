import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Invoice } from 'src/common/entities/invoice.entity';

@Injectable()
export class InvoiceRepository extends Repository<Invoice> {
  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }

  async getInvoiceCountByStatus(
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ status: string; count: number }[]> {
    const query = this.createQueryBuilder('invoice')
      .select('invoice.status', 'status')
      .addSelect('COUNT(invoice.id)', 'count');

    if (startDate && endDate) {
      query.where('invoice.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    return query.groupBy('invoice.status').getRawMany();
  }

  async getTotalInvoicesByCompany(companyId: number): Promise<number> {
    return this.createQueryBuilder('invoice')
      .where('invoice.companyId = :companyId', { companyId })
      .getCount();
  }
}
