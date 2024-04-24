import { Module } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { ChargesController } from './charges.controller';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [ChargesService],
  controllers: [ChargesController],
})
export class ChargesModule {}
