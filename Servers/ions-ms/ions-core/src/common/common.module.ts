import { Module } from '@nestjs/common';
import { UuidService } from './services/uuid.service';

@Module({
    providers: [
        UuidService
    ],
    exports: [
        UuidService
    ]
})
export class CommonModule { }
