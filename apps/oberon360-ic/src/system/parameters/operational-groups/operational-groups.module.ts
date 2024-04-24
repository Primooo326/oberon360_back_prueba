import { Module } from '@nestjs/common';
import { OperationalGroupsController } from './operational-groups.controller';
import { OperationalGroupsService } from './operational-groups.service';
import { UtilsModule } from 'apps/oberon360-ic/src/utils/utils.module';
import { CustomersModule } from 'apps/oberon360-ic/src/operation/customers/customers.module';

@Module({
  imports: [UtilsModule, CustomersModule],
  controllers: [OperationalGroupsController],
  providers: [OperationalGroupsService],
})
export class OperationalGroupsModule {}
