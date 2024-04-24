import { Module } from '@nestjs/common';
import { LocationsModule } from './locations/locations.module';
import { ParametersModule } from './parameters/parameters.module';

@Module({
  imports: [LocationsModule, ParametersModule],
})
export class SystemModule {}
