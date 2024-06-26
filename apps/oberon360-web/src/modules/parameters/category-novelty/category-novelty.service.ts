import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { MapCategoryNovelty } from './entities/map-category-novelty.entity';
import { CreateCategoryNoveltyDto } from './dto/create-category-novelty.dto';
import { UpdateCategoryNoveltyDto } from './dto/update-category-novelty.dto';
import { MapProtocol } from '../protocol/entities/map-protocol.entity';
import { MapSubCategoryNovelty } from '../sub-category-novelty/entities/map-sub-category-novelty.entity';

@Injectable()
export class CategoryNoveltyService {
  constructor(
    @InjectRepository(MapCategoryNovelty, 'MAP') private repositoryMapCategoryNovelty: Repository<MapCategoryNovelty>,
    @InjectRepository(MapSubCategoryNovelty, 'MAP') private repositoryMapSubCategoryNovelty: Repository<MapSubCategoryNovelty>,
  ) { }

  async findAllCategories(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapCategoryNovelty>>{
    const queryBuilder = this.repositoryMapCategoryNovelty.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.TIPRUTA_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .where("query.TIPRUTA_STATUS= :state", { state: '1' })
      })
      .orderBy("query.TIPRUTA_ID", pageOptionsDto.order)
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

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapCategoryNovelty>>{
    const queryBuilder = this.repositoryMapCategoryNovelty.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.TIPRUTA_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .where("query.TIPRUTA_STATUS= :state", { state: '1' })
      })
      .orderBy("query.TIPRUTA_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<MapCategoryNovelty | NotFoundException>{
    const data = await this.repositoryMapCategoryNovelty.createQueryBuilder("query")
      .where("query.TIPRUTA_ID= :id", { id: id })
      .andWhere("query.TIPRUTA_STATUS= :state", { state: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe una categoría de novedad con el id '+id);

    return data;
  }

  async create(dto: CreateCategoryNoveltyDto): Promise<{ message: string }> {
    const data = this.repositoryMapCategoryNovelty.create({
      ...dto,
      TIPRUTA_STATUS: '1',
      TIPRUTA_INSERT_DATE: new Date().toISOString()
    });

    await this.repositoryMapCategoryNovelty.save(data);

    return { message: 'Categoría de novedad registrada exitosamente' };
  }

  async update(id: string, dto: UpdateCategoryNoveltyDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la categoría de novedad solicitada' });

    await this.repositoryMapCategoryNovelty.update(id, {
      TIPRUTA_CLIENTEID: dto.TIPRUTA_CLIENTEID,
      TIPRUTA_DESCRIPCION: dto.TIPRUTA_DESCRIPCION,
      TIPRUTA_UPDATE_DATE: new Date().toISOString()
    });
  
    return { message: 'Categoría de novedad actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    if (await this.repositoryMapSubCategoryNovelty.createQueryBuilder('subcategory')
      .where('subcategory.NOVRUTA_IDTIPO = :id', { id })
      .andWhere('subcategory.NOVRUTA_STATUS = :state', { state: '1' })
      .getOne()) {
      throw new NotFoundException({ message: 'No es posible eliminar este elemento porque está vinculado a una subcategoría de novedad' });
    }

    await this.repositoryMapCategoryNovelty.update(id, {
      TIPRUTA_STATUS: '0'
    });

    return {message: 'Categoría eliminada exitosamente'};
  }
}