import { Module } from '@nestjs/common';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
