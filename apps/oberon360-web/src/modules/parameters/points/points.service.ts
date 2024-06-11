import { Injectable } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { MapPoint } from './entities/map-point.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(MapPoint, 'MAP') private repositoryMapPoint: Repository<MapPoint>
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapPoint>>{
    const queryBuilder = this.repositoryMapPoint.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.PUN_NOMBRE LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .andWhere("query.PUN_STATUS = :state", { state: '1' })
      })
      .orderBy("query.PUN_ID", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
  
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return {
      data: entities,
      meta: pageMetaDto
    }
  }
}
