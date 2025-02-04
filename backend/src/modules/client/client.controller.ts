import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/common/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientService.create(user, createClientDto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.clientService.findAllByCurrentUser(req.user);
  }
}
