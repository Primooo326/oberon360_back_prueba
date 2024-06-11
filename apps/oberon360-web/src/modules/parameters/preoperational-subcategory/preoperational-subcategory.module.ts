import { Module } from '@nestjs/common';
import { PreoperationalSubcategoryService } from './preoperational-subcategory.service';
import { PreoperationalSubcategoryController } from './preoperational-subcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapPreoperationalSubcategory } from './entities/map-preoperational-subcategory.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapPreoperationalSubcategory], 'MAP'),
  ],
  controllers: [PreoperationalSubcategoryController],
  providers: [PreoperationalSubcategoryService, JwtStrategy],
})
export class PreoperationalSubcategoryModule {}
