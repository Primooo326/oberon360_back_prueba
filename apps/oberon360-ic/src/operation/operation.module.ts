import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { RequestModule } from './request/request.module';
import { StudiesModule } from './studies/studies.module';
import { ReportsModule } from './reports/reports.module';
import { ParametersModule } from './parameters/parameters.module';

@Module({
  imports: [CustomersModule, RequestModule, StudiesModule, ReportsModule, ParametersModule],
})
export class OperationModule {}
