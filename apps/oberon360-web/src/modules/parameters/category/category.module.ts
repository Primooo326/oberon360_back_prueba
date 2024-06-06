import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapCategory } from './entities/map-category.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapCategory], 'MAP'),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, JwtStrategy],
})
export class CategoryModule {}
