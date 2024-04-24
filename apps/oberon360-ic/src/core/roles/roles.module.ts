import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
