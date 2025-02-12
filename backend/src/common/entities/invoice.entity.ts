import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { Client } from './client.entity';

@Entity('invoice')
export class Invoice {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  invoiceNumber: string;

  @Column()
  invoiceDate: Date;

  @Column()
  dueDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  publicUrl: string;

  @Column({ type: 'bigint' })
  clientId: number;

  @Column({ type: 'bigint' })
  companyId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
    cascade: ['insert'],
  })
  invoiceItems: InvoiceItem[];

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @BeforeInsert()
  recalculateTotal() {
    this.total = this.invoiceItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
}
