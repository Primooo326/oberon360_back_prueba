import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { ChargesModule } from './charges/charges.module';

@Module({
  imports: [AuthModule, RolesModule, UsersModule, ModulesModule, ChargesModule],
})
export class CoreModule {}
