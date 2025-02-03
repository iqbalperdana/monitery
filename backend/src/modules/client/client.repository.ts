import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Client } from 'src/common/entities/client.entity';

@Injectable()
export class ClientRepository extends Repository<Client> {
  constructor(private dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }
}
