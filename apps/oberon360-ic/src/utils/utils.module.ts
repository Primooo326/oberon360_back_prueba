import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { HelpersService } from './helpers.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [UtilsService, HelpersService],
  exports: [UtilsService, HelpersService, MailModule],
})
export class UtilsModule {}
