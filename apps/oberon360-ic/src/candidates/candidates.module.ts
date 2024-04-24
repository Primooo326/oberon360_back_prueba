import { Module } from '@nestjs/common';
import { InformationModule } from './information/information.module';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [InformationModule, UtilsModule],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
