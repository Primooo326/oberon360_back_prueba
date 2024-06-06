import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { MapCategoryNovelty } from './entities/map-category-novelty.entity';
import { CreateCategoryNoveltyDto } from './dto/create-category-novelty.dto';
import { UpdateCategoryNoveltyDto } from './dto/update-category-novelty.dto';

@Injectable()
export class CategoryNoveltyService {
  constructor(
    @InjectRepository(MapCategoryNovelty, 'MAP') private repositoryMapCategoryNovelty: Repository<MapCategoryNovelty>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapCategoryNovelty>>{
    const queryBuilder = this.repositoryMapCategoryNovelty.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.TIPRUTA_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .where("query.TIPRUTA_STATUS= :column", { column: '1' })
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
      .andWhere("query.TIPRUTA_STATUS= :column", { column: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe una categoría con el id '+id);

    return data;
  }

  async create(dto: CreateCategoryNoveltyDto): Promise<{ message: string }> {
    const data = this.repositoryMapCategoryNovelty.create({
      ...dto,
      TIPRUTA_STATUS: dto.TIPRUTA_STATUS
    });

    await this.repositoryMapCategoryNovelty.save(data);

    return { message: 'Categoría registrada exitosamente' };
  }

  async update(id: string, dto: UpdateCategoryNoveltyDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la categoría solicitada' });

    await this.repositoryMapCategoryNovelty.update(id, {
      TIPRUTA_CLIENTEID: dto.TIPRUTA_CLIENTEID,
      TIPRUTA_DESCRIPCION: dto.TIPRUTA_DESCRIPCION,
      TIPRUTA_STATUS: dto.TIPRUTA_STATUS
    });
  
    return { message: 'Categoría actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryMapCategoryNovelty.delete(id);

    return {message: 'Categoría eliminada exitosamente'};
  }
}