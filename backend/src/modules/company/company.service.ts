import { Injectable } from '@nestjs/common';
import { CompanyRepo } from './company.repository';
import { Company } from '../../common/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: CompanyRepo,
  ) {}

  async getAllActiveCompanies(): Promise<Company[]> {
    return this.companyRepository.getAllActiveCompanies();
  }

  async findAll(): Promise<Company[] | undefined> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company | undefined> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async create(company: Partial<Company>): Promise<Company> {
    const newCompany = this.companyRepository.create(company);
    return this.companyRepository.save(newCompany);
  }

  async update(
    id: number,
    company: Partial<Company>,
  ): Promise<Company | undefined> {
    await this.companyRepository.update(id, company);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
