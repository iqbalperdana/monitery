import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/companies')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }
}
