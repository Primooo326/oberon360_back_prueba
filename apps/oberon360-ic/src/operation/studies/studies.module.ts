import { Module } from '@nestjs/common';
import { StudiesController } from './studies.controller';
import { StudiesService } from './studies.service';
import { UtilsModule } from '../../utils/utils.module';
import { CustomersModule } from '../customers/customers.module';
import { FilesModule } from '../../files/files.module';

@Module({
  imports: [UtilsModule, CustomersModule, FilesModule],
  controllers: [StudiesController],
  providers: [StudiesService],
  exports: [StudiesService],
})
export class StudiesModule {}
