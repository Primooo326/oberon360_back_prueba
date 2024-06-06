import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapSubCategory } from './entities/map-sub-category.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapSubCategory], 'MAP'),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, JwtStrategy],
})
export class SubCategoryModule {}
