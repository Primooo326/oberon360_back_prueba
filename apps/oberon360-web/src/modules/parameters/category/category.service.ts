import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { MapCategory } from './entities/map-category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(MapCategory, 'MAP') private repositoryMapCategory: Repository<MapCategory>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapCategory>>{
    const queryBuilder = this.repositoryMapCategory.createQueryBuilder("query")
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

  async findOne(id: string): Promise<MapCategory | NotFoundException>{
    const data = await this.repositoryMapCategory.createQueryBuilder("query")
      .where("query.TIPRUTA_ID= :id", { id: id })
      .andWhere("query.TIPRUTA_STATUS= :column", { column: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe una categoría con el id '+id);

    return data;
  }

  async create(dto: CreateCategoryDto): Promise<{ message: string }> {
    const data = this.repositoryMapCategory.create({
      ...dto,
      TIPRUTA_STATUS: dto.TIPRUTA_STATUS || '1'
    });

    await this.repositoryMapCategory.save(data);

    return { message: 'Categoría registrada exitosamente' };
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la categoría solicitada' });

    await this.repositoryMapCategory.update(id, {
      TIPRUTA_CLIENTEID: dto.TIPRUTA_CLIENTEID,
      TIPRUTA_DESCRIPCION: dto.TIPRUTA_DESCRIPCION,
      TIPRUTA_STATUS: dto.TIPRUTA_STATUS
    });
  
    return { message: 'Categoría actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryMapCategory.delete(id);

    return {message: 'Categoría eliminada exitosamente'};
  }
}