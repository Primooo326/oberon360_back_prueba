import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver, 'MAP') private repositoryDriver: Repository<Driver>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<any> {
    const queryBuilder = this.repositoryDriver.createQueryBuilder("driver")
      .select([
        'CONDUCTOR_ID', 
        'CONDUCTOR_ID_TIPOIDENTIFICACION', 
        'CONDUCTOR_IDENTIFICACION', 
        'CONDUCTOR_CODCONDUCTOR', 
        'CONDUCTOR_PRIMERNOMBRE', 
        'CONDUCTOR_SEGUNDONOMBRE', 
        'CONDUCTOR_PRIMERAPELLIDO', 
        'CONDUCTOR_SEGUNDOAPELLIDO',
        'CONDUCTOR_ID_RH',
        'CONDUCTOR_TELPERSONAL',
        'CONDUCTOR_TELCORPORATIVO',
        'CONDUCTOR_CORREO',
        'CONDUCTOR_ID_CIUDAD',
        'CONDUCTOR_FECINGRESO',
        'CONDUCTOR_ESTADO'
      ])
      .addSelect("CONCAT(CONDUCTOR_PRIMERNOMBRE, ' ', CONDUCTOR_SEGUNDONOMBRE, ' ', CONDUCTOR_PRIMERAPELLIDO, ' ', CONDUCTOR_SEGUNDOAPELLIDO)", "CONDUCTOR_NOMBRE_COMPLETO")
      .where('CONDUCTOR_PRIMERNOMBRE LIKE :term', {
        term: `%${pageOptionsDto.term}%`
      })
      .orderBy("CONDUCTOR_ID", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
  
    const [rawResults, itemCount] = await Promise.all([
      queryBuilder.getRawMany(),
      queryBuilder.getCount(),
    ]);
  
    const entities = rawResults.map(rawResult => {
      return {
        ...rawResult,
        CONDUCTOR_NOMBRE_COMPLETO: rawResult.CONDUCTOR_NOMBRE_COMPLETO,
      };
    });
  
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
  
    return new PageDto(entities, pageMetaDto);
  }  

  async findOne(id: number) {
    const data = await this.repositoryDriver.createQueryBuilder("driver")
      .where("driver.CONDUCTOR_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe un conductor con el id '+id);

    return data;
  }

  async create(dto: CreateDriverDto): Promise<Driver | any> {
    const data = this.repositoryDriver.create(dto);

    await this.repositoryDriver.save(data);

    return {message: 'Catálogo registrado exitosamente'};
  }

  async update(id: number, dto: CreateDriverDto): Promise<any> {
    // const data = await this.findOne(id);
  
    // if (!data) throw new NotFoundException({ message: 'No existe el catálogo solicitado' });
  
    // await this.repositoryDriver.update(id, dto);
  
    // return { message: 'Catálogo actualizado exitosamente' };
  } 

  async remove(id: number) {
    await this.findOne(id);

    await this.repositoryDriver.delete(id);

    return {message: 'Catálogo eliminado exitosamente'};
  }
}