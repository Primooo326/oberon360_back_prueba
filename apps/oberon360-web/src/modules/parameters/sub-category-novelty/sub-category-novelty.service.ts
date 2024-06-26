import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { MapSubCategoryNovelty } from './entities/map-sub-category-novelty.entity';
import { CreateSubCategoryNoveltyDto } from './dto/create-sub-category-novelty.dto';
import { UpdateSubCategoryNoveltyDto } from './dto/update-sub-category-novelty.dto';

@Injectable()
export class SubCategoryNoveltyService {
  constructor(
    @InjectRepository(MapSubCategoryNovelty, 'MAP') private repositoryMapSubCategoryNovelty: Repository<MapSubCategoryNovelty>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapSubCategoryNovelty>>{
    const queryBuilder = this.repositoryMapSubCategoryNovelty.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.NOVRUTA_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .where("query.NOVRUTA_STATUS= :state", { state: '1' })
      })
      .orderBy("query.NOVRUTA_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<MapSubCategoryNovelty | NotFoundException>{
    const data = await this.repositoryMapSubCategoryNovelty.createQueryBuilder("query")
      .where("query.NOVRUTA_ID= :id", { id: id })
      .andWhere("query.NOVRUTA_STATUS= :state", { state: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe una subcategoría de novedad con el id '+id);

    return data;
  }

  async create(dto: CreateSubCategoryNoveltyDto): Promise<{ message: string }> {
    const data = this.repositoryMapSubCategoryNovelty.create({
      ...dto,
      NOVRUTA_STATUS: '1',
      NOVRUTA_INSERT_DATE: new Date().toISOString()
    });

    await this.repositoryMapSubCategoryNovelty.save(data);

    return { message: 'Subcategoría de novedad registrada exitosamente' };
  }

  async update(id: string, dto: UpdateSubCategoryNoveltyDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la subcategoría de novedad solicitada' });

    await this.repositoryMapSubCategoryNovelty.update(id, {
      NOVRUTA_IDTIPO: dto.NOVRUTA_IDTIPO,
      NOVRUTA_DESCRIPCION: dto.NOVRUTA_DESCRIPCION,
      NOVRUTA_UPDATE_DATE: new Date().toISOString()
    });
  
    return { message: 'Subcategoría de novedad actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryMapSubCategoryNovelty.update(id, {
      NOVRUTA_STATUS: '0'
    });

    return {message: 'Subcategoría de novedad eliminada exitosamente'};
  }
}