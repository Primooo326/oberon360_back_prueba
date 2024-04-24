import { Module } from '@nestjs/common';
import { Oberon360IcController } from './oberon360-ic.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { UtilsModule } from './utils/utils.module';
import { FilesModule } from './files/files.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { SystemModule } from './system/system.module';
import { OperationModule } from './operation/operation.module';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(String(process.env.MONGO_DB_URL)),
    CoreModule,
    FilesModule,
    IntegrationsModule,
    SystemModule,
    CandidatesModule,
    OperationModule,
    UtilsModule,
  ],
  controllers: [Oberon360IcController],
  providers: [],
})
export class Oberon360IcModule {}
