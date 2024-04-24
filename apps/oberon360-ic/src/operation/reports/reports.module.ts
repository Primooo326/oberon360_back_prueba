import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { FilesModule } from '../../files/files.module';
import { StudiesModule } from '../studies/studies.module';

@Module({
  imports: [FilesModule, StudiesModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
