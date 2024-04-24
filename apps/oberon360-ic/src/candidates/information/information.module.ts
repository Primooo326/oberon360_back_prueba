import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { UtilsModule } from '../../utils/utils.module';
import { FilesModule } from '../../files/files.module';

@Module({
  imports: [UtilsModule, FilesModule],
  providers: [InformationService],
  controllers: [InformationController],
})
export class InformationModule {}
