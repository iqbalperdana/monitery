import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import databaseConfig from './common/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { ItemModule } from './modules/item/item.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

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
    AuthModule,
    UserModule,
    CompanyModule,
    ClientModule,
    ItemModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
