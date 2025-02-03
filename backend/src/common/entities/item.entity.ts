import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'bigint' })
  companyId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
