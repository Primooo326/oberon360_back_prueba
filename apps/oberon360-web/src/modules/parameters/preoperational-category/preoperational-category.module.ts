import { Module } from '@nestjs/common';
import { PreoperationalCategoryService } from './preoperational-category.service';
import { PreoperationalCategoryController } from './preoperational-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapPreoperationalCategory } from './entities/map-preoperational-category.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { MapPreoperationalSubcategory } from '../preoperational-subcategory/entities/map-preoperational-subcategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapPreoperationalCategory, MapPreoperationalSubcategory], 'MAP'),
  ],
  controllers: [PreoperationalCategoryController],
  providers: [PreoperationalCategoryService, JwtStrategy],
})
export class PreoperationalCategoryModule {}
