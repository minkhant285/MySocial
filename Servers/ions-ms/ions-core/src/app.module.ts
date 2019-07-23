import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';
import { HomeModule } from './home/home.module';
import { UuidService } from './common/services/uuid.service';

const dbName = 'ions-core';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/' + dbName, { useNewUrlParser: true }),
        AuthModule,
        UsersModule,
        HomeModule
    ]
})
export class AppModule { }
