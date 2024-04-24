import { Module } from '@nestjs/common';
import { Oberon360IcController } from './oberon360-ic.controller';
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
  controllers: [Oberon360IcController],
  providers: [],
})
export class Oberon360IcModule {}
