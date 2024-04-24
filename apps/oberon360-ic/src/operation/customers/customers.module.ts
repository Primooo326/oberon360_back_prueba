import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [HttpModule, UtilsModule],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
