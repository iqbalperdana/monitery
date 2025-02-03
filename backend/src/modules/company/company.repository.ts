import { Repository, DataSource } from 'typeorm';
import { Company } from '../../common/entities/company.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepo extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

  async getAllActiveCompanies(): Promise<Company[] | undefined> {
    return await this.createQueryBuilder()
      .where(`company.isActive = true`)
      .getMany();
  }
}
