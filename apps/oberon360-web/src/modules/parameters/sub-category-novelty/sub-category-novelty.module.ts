import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { MapSubCategoryNovelty } from './entities/map-sub-category-novelty.entity';
import { SubCategoryNoveltyController } from './sub-category-novelty.controller';
import { SubCategoryNoveltyService } from './sub-category-novelty.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapSubCategoryNovelty], 'MAP'),
  ],
  controllers: [SubCategoryNoveltyController],
  providers: [SubCategoryNoveltyService, JwtStrategy],
})
export class SubCategoryNoveltyModule {}
