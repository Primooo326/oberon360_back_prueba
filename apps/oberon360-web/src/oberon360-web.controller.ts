import { Controller, Get } from '@nestjs/common';
import { Oberon360WebService } from './oberon360-web.service';

@Controller()
export class Oberon360WebController {
  constructor(private readonly oberon360WebService: Oberon360WebService) {}

  @Get()
  getHello(): string {
    return this.oberon360WebService.getHello();
  }
}
