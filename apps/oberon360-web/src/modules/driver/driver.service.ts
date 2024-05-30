import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { IHeaderCustomTable } from 'apps/oberon360-api/src/interfaces/global-components.interface';

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

      const columns: IHeaderCustomTable[] = await this.getColumns();
      return {
        data: entities,
        columns: columns,
        meta: pageMetaDto
      }
  }
  
  private async getColumns(): Promise<IHeaderCustomTable[]> {
    return [
      {
        type: 'button',
        name: 'Detalle',
        props: {
          options: {
            color: 'secondary',
            size: 'md',
            loader: true
          },
          disabled: false,
          children: 'Foto'
        }
      },
      {
        type: 'cell',
        name: 'Tipo de Documento',
        selector: "typeIdentification.TIP_IDEN_DESCRIPCION",
        sortable: true
      },
      {
        type: 'cell',
        name: 'Documento',
        selector: "CONDUCTOR_IDENTIFICACION",
        sortable: true
      },
      {
        type: 'cell',
        name: 'Código',
        selector: "CONDUCTOR_CODCONDUCTOR",
        sortable: true
      },
      {
        type: 'cell',
        name: 'Nombre',
        selector: "CONDUCTOR_PRIMERNOMBRE",
        sortable: true
      },
      {
        type: 'cell',
        name: 'RH',
        selector: "factorRh.FACTOR_RH_DESCRIPCION",
        sortable: true
      },
      {
        type: 'cell',
        name: 'Teléfono Personal',
        selector: "CONDUCTOR_TELPERSONAL",
        sortable: true
      },
      {
        type: 'cell',
        name: 'Teléfono Corporativo',
        selector: "CONDUCTOR_TELCORPORATIVO",
        sortable: true
      }
    ]
  }

  async findOne(id: number) {
    const data = await this.repositoryDriver.createQueryBuilder("driver")
      .where("driver.CONDUCTOR_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe un conductor con el id '+id);

    return data;
  }

  async create(dto: CreateDriverDto): Promise<Driver | any> {
    const createData = {
      CONDUCTOR_ID_TIPOIDENTIFICACION: dto.CONDUCTOR_ID_TIPOIDENTIFICACION,
      CONDUCTOR_IDENTIFICACION: dto.CONDUCTOR_IDENTIFICACION,
      CONDUCTOR_CODCONDUCTOR: dto.CONDUCTOR_CODCONDUCTOR,
      CONDUCTOR_PRIMERNOMBRE: dto.CONDUCTOR_PRIMERNOMBRE,
      CONDUCTOR_SEGUNDONOMBRE: dto.CONDUCTOR_SEGUNDONOMBRE,
      CONDUCTOR_PRIMERAPELLIDO: dto.CONDUCTOR_PRIMERAPELLIDO,
      CONDUCTOR_SEGUNDOAPELLIDO: dto.CONDUCTOR_SEGUNDOAPELLIDO,
      CONDUCTOR_ID_RH: dto.CONDUCTOR_ID_RH,
      CONDUCTOR_TELPERSONAL: dto.CONDUCTOR_TELPERSONAL,
      CONDUCTOR_TELCORPORATIVO: dto.CONDUCTOR_TELCORPORATIVO,
      CONDUCTOR_CORREO: dto.CONDUCTOR_CORREO,
      CONDUCTOR_ID_CIUDAD: dto.CONDUCTOR_ID_CIUDAD,
      CONDUCTOR_PASSWORD: 'zXTwzRRMJkUw1hSxs2cTkg==',
      CONDUCTOR_FOTO: dto.CONDUCTOR_FOTO ? this.base64ToBinary(dto.CONDUCTOR_FOTO) : null,
      CONDUCTOR_FECINGRESO: new Date(),
      CONDUCTOR_ESTADO: dto.CONDUCTOR_ESTADO,
    };

    const data = this.repositoryDriver.create(createData);

    await this.repositoryDriver.save(data);

    return { message: 'Conductor registrado exitosamente' };
  }

  async update(id: number, dto: CreateDriverDto): Promise<any> {
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe el conductor solicitado' });
    
    const updateData = {
      CONDUCTOR_ID_TIPOIDENTIFICACION: dto.CONDUCTOR_ID_TIPOIDENTIFICACION,
      CONDUCTOR_IDENTIFICACION: dto.CONDUCTOR_IDENTIFICACION,
      CONDUCTOR_CODCONDUCTOR: dto.CONDUCTOR_CODCONDUCTOR,
      CONDUCTOR_PRIMERNOMBRE: dto.CONDUCTOR_PRIMERNOMBRE,
      CONDUCTOR_SEGUNDONOMBRE: dto.CONDUCTOR_SEGUNDONOMBRE,
      CONDUCTOR_PRIMERAPELLIDO: dto.CONDUCTOR_PRIMERAPELLIDO,
      CONDUCTOR_SEGUNDOAPELLIDO: dto.CONDUCTOR_SEGUNDOAPELLIDO,
      CONDUCTOR_ID_RH: dto.CONDUCTOR_ID_RH,
      CONDUCTOR_TELPERSONAL: dto.CONDUCTOR_TELPERSONAL,
      CONDUCTOR_TELCORPORATIVO: dto.CONDUCTOR_TELCORPORATIVO,
      CONDUCTOR_CORREO: dto.CONDUCTOR_CORREO,
      CONDUCTOR_ID_CIUDAD: dto.CONDUCTOR_ID_CIUDAD,
      CONDUCTOR_FOTO: dto.CONDUCTOR_FOTO ? await this.base64ToBinary(dto.CONDUCTOR_FOTO) : null,
      CONDUCTOR_FECINGRESO: new Date(),
      CONDUCTOR_ESTADO: dto.CONDUCTOR_ESTADO,
    };

    await this.repositoryDriver.update(id, updateData);
  
    return { message: 'Conductor actualizado exitosamente' };
  } 

  async remove(id: number) {
    await this.findOne(id);

    await this.repositoryDriver.delete(id);

    return {message: 'Conductor eliminado exitosamente'};
  }

  private base64ToBinary(base64: string): any {
    return Buffer.from(base64, 'base64');
  }
}