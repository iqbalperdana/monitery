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

@Controller('api/clients')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Request() req, @Body() createClientDto: CreateClientDto) {
    return this.clientService.create(req.user, createClientDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.clientService.findAllByCurrentUser(req.user);
  }
}
