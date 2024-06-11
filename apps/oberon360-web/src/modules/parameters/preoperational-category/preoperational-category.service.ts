import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { CreatePreoperationalCategoryDto } from './dto/create-preoperational-category.dto';
import { UpdatePreoperationalCategoryDto } from './dto/update-preoperational-category.dto';
import { MapPreoperationalCategory } from './entities/map-preoperational-category.entity';
import { MapPreoperationalSubcategory } from '../preoperational-subcategory/entities/map-preoperational-subcategory.entity';

@Injectable()
export class PreoperationalCategoryService {
  constructor(
    @InjectRepository(MapPreoperationalCategory, 'MAP') private repositoryMapPreoperationalCategory: Repository<MapPreoperationalCategory>,
    @InjectRepository(MapPreoperationalSubcategory, 'MAP') private repositoryMapPreoperationalSubcategory: Repository<MapPreoperationalSubcategory>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapPreoperationalCategory>>{
    const queryBuilder = this.repositoryMapPreoperationalCategory.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.CATPREOP_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .andWhere("query.CATPREOP_ESTADO = :state", { state: '1' })
      })
      .orderBy("query.CATPREOP_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<MapPreoperationalCategory | NotFoundException>{
    const data = await this.repositoryMapPreoperationalCategory.createQueryBuilder("query")
      .where("query.CATPREOP_ID= :id", { id: id })
      .andWhere("query.CATPREOP_ESTADO = :state", { state: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe una categoría preoperacional con el id '+id);

    return data;
  }

  async create(dto: CreatePreoperationalCategoryDto): Promise<{ message: string }> {
    const data = this.repositoryMapPreoperationalCategory.create({
      ...dto,
      CATPREOP_ESTADO: '1',
      CATPREOP_INSERT_DATE: new Date().toISOString()
    });

    await this.repositoryMapPreoperationalCategory.save(data);

    return { message: 'Categoría preoperacional registrada exitosamente' };
  }

  async update(id: string, dto: UpdatePreoperationalCategoryDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la categoría preoperacional solicitada' });

    await this.repositoryMapPreoperationalCategory.update(id, {
      ...dto,
      CATPREOP_UPDATE_DATE: new Date().toISOString()
    });
  
    return { message: 'Categoría preoperacional actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    if (await this.repositoryMapPreoperationalSubcategory.createQueryBuilder('subcategory')
      .where('subcategory.SUBCATPREOP_IDCATEGORIA = :id', { id })
      .andWhere('subcategory.SUBCATPREOP_ESTADO = :state', { state: '1' })
      .getOne()) {
      throw new NotFoundException({ message: 'No es posible eliminar este elemento porque está vinculado a una subcategoría preoperacional' });
    }

    await this.repositoryMapPreoperationalCategory.update(id, {
      CATPREOP_ESTADO: '0'
    });

    return {message: 'Categoría preoperacional eliminada exitosamente'};
  }
}