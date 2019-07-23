import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeSchema } from './models/home.schema';
import { HomeController } from './home.controller';
import { UuidService } from 'src/common/services/uuid.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Home', schema: HomeSchema}]),
  ],
  providers: [HomeService, UuidService],
  controllers: [HomeController]
})

@Module({})
export class HomeModule {}
