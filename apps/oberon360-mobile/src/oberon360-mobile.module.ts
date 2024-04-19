import { Module } from '@nestjs/common';
import { Oberon360MobileController } from './oberon360-mobile.controller';
import { Oberon360MobileService } from './oberon360-mobile.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    })
  ],
  controllers: [Oberon360MobileController],
  providers: [Oberon360MobileService],
})
export class Oberon360MobileModule {}
