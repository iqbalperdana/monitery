import { User } from 'src/common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from 'src/common/entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private itemRepository: ItemRepository) {}

  async create(user: User, createItemDto: CreateItemDto) {
    const item = new Item();
    item.name = createItemDto.name;
    item.description = createItemDto.description;
    item.price = createItemDto.price;
    item.image_url = createItemDto.image_url;
    item.companyId = user.companyId;
    item.is_active = true;
    return await this.itemRepository.save(item);
  }

  async findAll(user: User): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { companyId: user.companyId },
    });
  }

  async deactivate(user: User, id: number) {
    const item = await this.itemRepository.findOne({
      where: { id, companyId: user.companyId },
    });

    if (!item) {
      throw new BadRequestException('Item not found');
    }

    item.is_active = false;
    return await this.itemRepository.save(item);
  }
}
