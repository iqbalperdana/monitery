import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';

@UseGuards(JwtAuthGuard)
@Controller('api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.create(user, createItemDto);
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.itemService.findAll(user);
  }

  @Put(':id/deactivate')
  async deactivate(@CurrentUser() user: User, @Param('id') id: number) {
    return this.itemService.deactivate(user, id);
  }
}
