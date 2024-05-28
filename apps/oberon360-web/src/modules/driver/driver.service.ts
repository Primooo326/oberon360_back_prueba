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
      .leftJoin('driver.typeIdentification', 'typeIdentification')
      .leftJoin('driver.factorRh', 'factorRh')
      .select([
        'driver.CONDUCTOR_ID',
        'typeIdentification.TIP_IDEN_DESCRIPCION',
        'driver.CONDUCTOR_IDENTIFICACION', 
        'driver.CONDUCTOR_CODCONDUCTOR', 
        'driver.CONDUCTOR_PRIMERNOMBRE',
        'driver.CONDUCTOR_SEGUNDONOMBRE',
        'driver.CONDUCTOR_PRIMERAPELLIDO',
        'driver.CONDUCTOR_SEGUNDOAPELLIDO',
        'factorRh.FACTOR_RH_DESCRIPCION',
        'driver.CONDUCTOR_TELPERSONAL',
        'driver.CONDUCTOR_TELCORPORATIVO',
        'driver.CONDUCTOR_CORREO',
        'driver.CONDUCTOR_FECINGRESO',
        'driver.CONDUCTOR_ESTADO'
      ])
      .where('driver.CONDUCTOR_PRIMERNOMBRE LIKE :term', {
        term: `%${pageOptionsDto.term}%`
      })
      .orderBy("driver.CONDUCTOR_ID", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
  
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
  
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const columns = await this.getColumns();
      return {
        data: entities,
        columns:columns.columns,
        meta: pageMetaDto
      }
  }
  
  getColumns() {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
          resolve({
            columns: [
              {
                name: 'Tipo de Documento',
                selector: (row: any) => row.typeIdentification.TIP_IDEN_DESCRIPCION,
                sortable: true,
              },
              {
                name: 'Documento',
                selector: (row: any) => row.CONDUCTOR_IDENTIFICACION,
                sortable: true,
              },
              {
                name: 'Código',
                selector: (row: any) => row.CONDUCTOR_CODCONDUCTOR,
                sortable: true,
              },
              {
                name: 'Nombre',
                selector: (row: any) => row.CONDUCTOR_PRIMERNOMBRE,
                sortable: true,
              },
              {
                name: 'RH',
                selector: (row: any) => row.factorRh.FACTOR_RH_DESCRIPCION,
                sortable: true,
              },
              {
                name: 'Teléfono Personal',
                selector: (row: any) => row.CONDUCTOR_TELPERSONAL,
                sortable: true,
              },
              {
                name: 'Teléfono Corporativo',
                selector: (row: any) => row.CONDUCTOR_TELCORPORATIVO,
                sortable: true,
              }
            ]
          });
        }, 1);
    });
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