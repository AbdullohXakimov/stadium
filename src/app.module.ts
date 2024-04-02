import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ComfortModule } from './comfort/comfort.module';
import { Comfort } from './comfort/entities/comfort.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { RegionModule } from './region/region.module';
import { Region } from './region/entities/region.entity';
import { DistrictModule } from './district/district.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { District } from './district/entities/district.entity';
import { MailModule } from './mail/mail.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { Stadium } from './stadiums/entities/stadium.entity';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.P_PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      models: [User, Comfort, Category, Region, Admin, District , Stadium],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    CategoriesModule,
    RegionModule,
    DistrictModule,
    AdminModule,
    MailModule,
    StadiumsModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
