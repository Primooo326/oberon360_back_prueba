import { Module } from '@nestjs/common';
import { Oberon360WebController } from './oberon360-web.controller';
import { Oberon360WebService } from './oberon360-web.service';
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
  controllers: [Oberon360WebController],
  providers: [Oberon360WebService],
})
export class Oberon360WebModule {}
