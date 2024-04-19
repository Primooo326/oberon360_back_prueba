import { Controller, Get } from '@nestjs/common';
import { Oberon360MobileService } from './oberon360-mobile.service';

@Controller()
export class Oberon360MobileController {
  constructor(private readonly oberon360MobileService: Oberon360MobileService) {}

  @Get()
  getHello(): string {
    return this.oberon360MobileService.getHello();
  }
}
