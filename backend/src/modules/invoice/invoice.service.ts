import { User } from 'src/common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from 'src/common/entities/invoice.entity';
import { InvoiceItem } from 'src/common/entities/invoice-item.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: InvoiceRepository,
  ) {}

  async create(user: User, createInvoiceDto: CreateInvoiceDto) {
    // TODO: Implement transaction for invoice and invoice items
    const invoice = new Invoice();
    invoice.invoiceDate = new Date(createInvoiceDto.invoiceDate);
    invoice.dueDate = new Date(createInvoiceDto.dueDate);
    invoice.total = createInvoiceDto.total;
    invoice.notes = createInvoiceDto.notes;
    invoice.clientId = createInvoiceDto.clientId;
    invoice.companyId = user.companyId;
    invoice.status = 'pending';
    invoice.invoiceNumber = await this.generateInvoiceNumber(
      user.companyId,
      invoice.invoiceDate,
    );

    const invoiceItems = [];
    for (const item of createInvoiceDto.invoiceItems) {
      const invoiceItem = new InvoiceItem();
      invoiceItem.name = item.name;
      invoiceItem.description = item.description;
      invoiceItem.quantity = item.quantity;
      invoiceItem.price = item.price;
      invoiceItem.image_url = item.image_url;
      invoiceItem.companyId = user.companyId;
      invoiceItem.itemId = item.itemId;
      invoiceItems.push(invoiceItem);
    }

    invoice.invoiceItems = invoiceItems;
    await this.invoiceRepository.save(invoice);
    return invoice;
  }

  async findAll(user: User, number: string): Promise<Invoice[]> {
    if (number) {
      return await this.invoiceRepository.find({
        where: {
          companyId: user.companyId,
          invoiceNumber: number,
        },
        relations: ['invoiceItems', 'client'],
      });
    }

    return await this.invoiceRepository.find({
      where: { companyId: user.companyId },
    });
  }

  async generateInvoiceNumber(
    companyId: number,
    invoiceDate: Date,
  ): Promise<string> {
    const year = invoiceDate.getFullYear();
    const month = String(invoiceDate.getMonth() + 1).padStart(2, '0');
    const day = String(invoiceDate.getDate()).padStart(2, '0');

    const invoiceCount = await this.invoiceRepository.count({
      where: { companyId },
    });
    const invoiceNumberWithCount = `INV${year}${month}${day}${this.addLeadingZeros(invoiceCount + 1, 4)}`;
    return invoiceNumberWithCount;
  }

  addLeadingZeros(number: number, length: number): string {
    return number.toString().padStart(length, '0');
  }

  async getSummary(user: User): Promise<any> {
    const invoiceSummary =
      await this.invoiceRepository.getInvoiceCountByStatus();
    const totalInvoices =
      await this.invoiceRepository.getTotalInvoicesByCompany(user.companyId);

    return {
      invoiceSummary,
      totalInvoices,
    };
  }

  async getInvoiceByUserAndInvoiceId(
    user: User,
    invoiceId: string,
  ): Promise<Invoice> {
    return await this.invoiceRepository.findOne({
      where: { id: parseInt(invoiceId), companyId: user.companyId },
      relations: ['invoiceItems', 'client'],
    });
  }
}
