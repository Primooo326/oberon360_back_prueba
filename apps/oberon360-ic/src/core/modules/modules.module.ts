import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [ModulesService],
  controllers: [ModulesController],
})
export class ModulesModule {}
