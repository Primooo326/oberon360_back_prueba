import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { UtilsModule } from '../../utils/utils.module';
import { CustomersModule } from '../customers/customers.module';
import { ParametersModule } from '../parameters/parameters.module';
import { ParametersService } from '../../system/parameters/parameters.service';

@Module({
  imports: [UtilsModule, CustomersModule, ParametersModule],
  controllers: [RequestController],
  providers: [RequestService, ParametersService],
})
export class RequestModule {}
