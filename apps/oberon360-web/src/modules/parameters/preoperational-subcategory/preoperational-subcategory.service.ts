import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { CreatePreoperationalSubcategoryDto } from './dto/create-preoperational-subcategory.dto';
import { UpdatePreoperationalSubcategoryDto } from './dto/update-preoperational-subcategory.dto';
import { MapPreoperationalSubcategory } from './entities/map-preoperational-subcategory.entity';

@Injectable()
export class PreoperationalSubcategoryService {
  constructor(
    @InjectRepository(MapPreoperationalSubcategory, 'MAP') private repositoryMapPreoperationalSubcategory: Repository<MapPreoperationalSubcategory>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapPreoperationalSubcategory>>{
    const queryBuilder = this.repositoryMapPreoperationalSubcategory.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.SUBCATPREOP_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .andWhere("query.SUBCATPREOP_ESTADO = :state", { state: '1' })
      })
      .orderBy("query.SUBCATPREOP_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<MapPreoperationalSubcategory | NotFoundException>{
    const data = await this.repositoryMapPreoperationalSubcategory.createQueryBuilder("query")
      .where("query.SUBCATPREOP_ID= :id", { id: id })
      .andWhere("query.SUBCATPREOP_ESTADO = :state", { state: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe una subcategoría preoperacional con el id '+id);

    return data;
  }

  async create(dto: CreatePreoperationalSubcategoryDto): Promise<{ message: string }> {
    const data = this.repositoryMapPreoperationalSubcategory.create({
      ...dto,
      SUBCATPREOP_ESTADO: '1',
      SUBCATPREOP_INSERT_DATE: new Date().toISOString()
    });

    await this.repositoryMapPreoperationalSubcategory.save(data);

    return { message: 'Subcategoría preoperacional registrada exitosamente' };
  }

  async update(id: string, dto: UpdatePreoperationalSubcategoryDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la subcategoría preoperacional solicitada' });

    await this.repositoryMapPreoperationalSubcategory.update(id, {
      ...dto,
      SUBCATPREOP_UPDATE_DATE: new Date().toISOString()
    });
  
    return { message: 'Subcategoría preoperacional actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryMapPreoperationalSubcategory.update(id, {
      SUBCATPREOP_ESTADO: '0'
    });

    return {message: 'Subcategoría preoperacional eliminada exitosamente'};
  }
}