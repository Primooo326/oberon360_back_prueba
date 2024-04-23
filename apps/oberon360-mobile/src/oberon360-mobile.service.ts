import { Injectable } from '@nestjs/common';

@Injectable()
export class Oberon360MobileService {
  getHello(): string {
    return 'Hello World!';
  }
}
