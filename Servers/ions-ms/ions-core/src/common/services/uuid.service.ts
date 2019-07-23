import { Injectable } from '@nestjs/common';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class UuidService {
   public getUuid() {
        return uuidv4();
    }
}
