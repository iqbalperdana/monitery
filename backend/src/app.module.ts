import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import databaseConfig from './common/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('databaseConfig'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
