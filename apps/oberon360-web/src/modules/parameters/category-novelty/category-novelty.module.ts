import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { MapCategoryNovelty } from './entities/map-category-novelty.entity';
import { CategoryNoveltyController } from './category-novelty.controller';
import { CategoryNoveltyService } from './category-novelty.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapCategoryNovelty], 'MAP'),
  ],
  controllers: [CategoryNoveltyController],
  providers: [CategoryNoveltyService, JwtStrategy],
})
export class CategoryNoveltyModule {}
