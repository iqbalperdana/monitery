import { User } from 'src/common/entities/user.entity';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Client } from 'src/common/entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: ClientRepository,
  ) {}

  async create(user: User, createClientDto: CreateClientDto) {
    const client = new Client();
    client.firstName = createClientDto.firstName;
    client.lastName = createClientDto.lastName;
    client.email = createClientDto.email;
    client.phone = createClientDto.phone;
    client.companyId = user.companyId;
    return await this.clientRepository.save(client);
  }

  async findAllByCurrentUser(user: User): Promise<Client[]> {
    return await this.clientRepository.find({
      where: { companyId: user.companyId },
    });
  }
}
