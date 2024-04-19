import { Injectable } from '@nestjs/common';

@Injectable()
export class Oberon360WebService {
  getHello(): string {
    return 'Hello World!';
  }
}
