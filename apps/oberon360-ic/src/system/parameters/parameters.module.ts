import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ParametersController } from './parameters.controller';
import { TypesController } from './types/types.controller';
import { TypesService } from './types/types.service';
import { GroupsService } from './groups/groups.service';
import { GroupsController } from './groups/groups.controller';
import { OperationalGroupsModule } from './operational-groups/operational-groups.module';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule, OperationalGroupsModule],
  providers: [ParametersService, TypesService, GroupsService],
  controllers: [ParametersController, TypesController, GroupsController],
  exports: [ParametersService],
})
export class ParametersModule {}
