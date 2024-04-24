import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { UtilsModule } from '../../utils/utils.module';
import { FilesModule } from '../../files/files.module';

@Module({
  imports: [UtilsModule, FilesModule],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
