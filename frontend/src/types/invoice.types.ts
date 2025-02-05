export interface CreateInvoiceDto {
  invoiceNumber: string;
  clientId: number;
  invoiceDate: string;
  dueDate: string;
  total: number;
  invoiceItems: {
    itemId: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image_url: string;
  }[];
}
