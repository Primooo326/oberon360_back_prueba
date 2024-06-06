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
        .where("query.NOVRUTA_STATUS= :column", { column: '1' })
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
      .andWhere("query.NOVRUTA_STATUS= :column", { column: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe una sub categoría con el id '+id);

    return data;
  }

  async create(dto: CreateSubCategoryNoveltyDto): Promise<{ message: string }> {
    const data = this.repositoryMapSubCategoryNovelty.create({
      ...dto,
      NOVRUTA_STATUS: dto.NOVRUTA_STATUS
    });

    await this.repositoryMapSubCategoryNovelty.save(data);

    return { message: 'Sub categoría registrada exitosamente' };
  }

  async update(id: string, dto: UpdateSubCategoryNoveltyDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la sub categoría solicitada' });

    await this.repositoryMapSubCategoryNovelty.update(id, {
      NOVRUTA_IDTIPO: dto.NOVRUTA_IDTIPO,
      NOVRUTA_DESCRIPCION: dto.NOVRUTA_DESCRIPCION,
      NOVRUTA_STATUS: dto.NOVRUTA_STATUS
    });
  
    return { message: 'Sub categoría actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryMapSubCategoryNovelty.delete(id);

    return {message: 'Sub categoría eliminada exitosamente'};
  }
}