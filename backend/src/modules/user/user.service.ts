import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import { ViewUserDto } from './dto/view-user.dto';
import { EntityNotFoundException } from '../../common/exceptions/entity-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private companyService: CompanyService,
  ) {}

  async findAll(): Promise<ViewUserDto[] | undefined> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      const viewUserDto = ViewUserDto.fromEntity(user);
      return viewUserDto;
    });
  }

  async getAllActiveUsers(): Promise<ViewUserDto[] | undefined> {
    const activeUsers = await this.userRepository.getAllActiveUser();
    return activeUsers.map((user) => {
      const viewUserDto = ViewUserDto.fromEntity(user);
      return viewUserDto;
    });
  }

  async findById(id: number): Promise<ViewUserDto | EntityNotFoundException> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new EntityNotFoundException(`User with id ${id} not found`);
    }
    return ViewUserDto.fromEntity(user);
  }

  async create(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, user: Partial<User>): Promise<ViewUserDto> {
    const existingUser = await this.findById(id);
    if (existingUser instanceof EntityNotFoundException) {
      throw existingUser;
    }
    const updatedUser = Object.assign(new User(), existingUser, user);
    const savedUser = await this.userRepository.save(updatedUser);
    return ViewUserDto.fromEntity(savedUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    let expiredDate = null;
    if (refreshToken) {
      const decodedToken = JSON.parse(
        Buffer.from(refreshToken.split('.')[1], 'base64').toString(),
      );
      expiredDate = new Date(decodedToken.exp * 1000);
    }

    await this.userRepository.update(user.id, {
      refreshToken: refreshToken,
      refreshTokenExpires: expiredDate,
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { refreshToken } });
  }

  async register(user: Partial<User>, companyName: string): Promise<User> {
    const company = {
      name: companyName,
      description: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    user.companyId = (await this.companyService.create(company)).id;
    return await this.userRepository.save(user);
  }
}
