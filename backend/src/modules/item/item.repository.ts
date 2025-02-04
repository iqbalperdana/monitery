import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Item } from 'src/common/entities/item.entity';

@Injectable()
export class ItemRepository extends Repository<Item> {
  constructor(private dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }
}
