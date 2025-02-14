import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'bigint', default: 1 })
  companyId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  fullName: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  generateFullname(): void {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
