import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Item } from './item.entity';

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

  @Column({ type: 'bigint' })
  clientId: number;

  @Column({ type: 'bigint' })
  companyId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Item)
  @JoinTable({
    name: 'invoice_item',
    joinColumn: {
      name: 'invoice_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'item_id',
      referencedColumnName: 'id',
    },
  })
  items: Item[];
}
