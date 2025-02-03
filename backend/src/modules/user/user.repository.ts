import { Repository, DataSource } from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getAllActiveUser(): Promise<User[] | undefined> {
    return await this.createQueryBuilder()
      .where(`user.is_active = true`)
      .getMany();
  }
}
