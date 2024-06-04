import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { IHeaderCustomTable } from 'apps/oberon360-api/src/interfaces/global-components.interface';
import { DownloadExcelDto, ElementData } from './dto/download.excel.dto';
import { Workbook } from 'exceljs';
import * as fs from 'fs';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver, 'MAP') private repositoryDriver: Repository<Driver>,
  ) { }

  async findAllDrivers(): Promise<{data: Driver[]}>{
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
      .orderBy("driver.CONDUCTOR_ID", 'ASC')
      .skip(1)
      .take(1000);
  
    const { entities } = await queryBuilder.getRawAndEntities();

    return {
      data: entities
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Driver>>{
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
        'driver.CONDUCTOR_ESTADO',
        'driver.CONDUCTOR_FOTO'
      ])
      .andWhere(qb => {
        qb.where('(driver.CONDUCTOR_PRIMERNOMBRE LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        qb.orWhere('(driver.CONDUCTOR_SEGUNDONOMBRE LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        qb.orWhere('(driver.CONDUCTOR_PRIMERAPELLIDO LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        qb.orWhere('(driver.CONDUCTOR_SEGUNDOAPELLIDO LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        qb.orWhere('(driver.CONDUCTOR_TELPERSONAL LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        qb.orWhere('(driver.CONDUCTOR_TELCORPORATIVO LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        qb.orWhere('(driver.CONDUCTOR_CORREO LIKE :term)', {term: `%${pageOptionsDto.term}%`})
      })
      .orderBy("driver.CONDUCTOR_ID", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
  
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    for (const element of entities){
      if (element.CONDUCTOR_FOTO) {
        const photoBase64 = this.bufferToBase64(element.CONDUCTOR_FOTO);
        element.CONDUCTOR_FOTO = photoBase64;
      }
    }

    return {
      data: entities,
      meta: pageMetaDto
    }
  }

  async findOne(id: number): Promise<Driver | NotFoundException>{
    const data = await this.repositoryDriver.createQueryBuilder("driver")
      .where("driver.CONDUCTOR_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe un conductor con el id '+id);

    return data;
  }

  async findByTerm(nameColumn: string, term: string, isUpdate: boolean = false, driverId: number = null): Promise<Driver | null> {
    const query: Record<string, any> = {};
    query[nameColumn] = term;
  
    const whereCondition: Record<string, any> = { ...query };
    
    if (isUpdate) {
      whereCondition.CONDUCTOR_ID = Not(driverId);
    }
  
    return await this.repositoryDriver.findOne({
      where: whereCondition,
    });
  } 

  async create(dto: CreateDriverDto): Promise<{message: string}>{
    if (await this.findByTerm('CONDUCTOR_IDENTIFICACION', dto.CONDUCTOR_IDENTIFICACION)) throw new NotFoundException('Ya existe un conductor con el documento ' + dto.CONDUCTOR_IDENTIFICACION);
    if (await this.findByTerm('CONDUCTOR_CODCONDUCTOR', dto.CONDUCTOR_CODCONDUCTOR)) throw new NotFoundException('Ya existe un conductor con el código ' + dto.CONDUCTOR_CODCONDUCTOR);

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
      CONDUCTOR_PASSWORD: 'zXTwzRRMJkUw1hSxs2cTkg==',
      CONDUCTOR_FOTO: dto.CONDUCTOR_FOTO ? this.base64ToBinary(dto.CONDUCTOR_FOTO) : null,
      CONDUCTOR_FECINGRESO: new Date(),
      CONDUCTOR_ESTADO: dto.CONDUCTOR_ESTADO ? dto.CONDUCTOR_ESTADO : '1'
    };

    const data = this.repositoryDriver.create(createData);

    await this.repositoryDriver.save(data);

    return { message: 'Conductor registrado exitosamente' };
  }

  async update(id: number, dto: UpdateDriverDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe el conductor solicitado' });
    
    if (dto.CONDUCTOR_IDENTIFICACION){
      if (await this.findByTerm('CONDUCTOR_IDENTIFICACION', dto.CONDUCTOR_IDENTIFICACION, true, id)) throw new NotFoundException('Ya existe un conductor con el documento ' + dto.CONDUCTOR_IDENTIFICACION);
    }
    if (dto.CONDUCTOR_CODCONDUCTOR){
      if (await this.findByTerm('CONDUCTOR_CODCONDUCTOR', dto.CONDUCTOR_CODCONDUCTOR, true, id)) throw new NotFoundException('Ya existe un conductor con el código ' + dto.CONDUCTOR_CODCONDUCTOR);
    }

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
      CONDUCTOR_PASSWORD: 'zXTwzRRMJkUw1hSxs2cTkg==',
      CONDUCTOR_FOTO: dto.CONDUCTOR_FOTO ? this.base64ToBinary(dto.CONDUCTOR_FOTO) : null,
      CONDUCTOR_FECINGRESO: new Date(),
      CONDUCTOR_ESTADO: dto.CONDUCTOR_ESTADO ? dto.CONDUCTOR_ESTADO : '1'
    };

    await this.repositoryDriver.update(id, updateData);
  
    return { message: 'Conductor actualizado exitosamente' };
  } 

  async remove(id: number): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryDriver.delete(id);

    return {message: 'Conductor eliminado exitosamente'};
  }

  async downloadExcel(dto: DownloadExcelDto): Promise<any> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const headers = Object.keys(dto.dataExport[0]);
    const headerRow = worksheet.addRow(headers);

    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '3B82F6' }
        };
        cell.font = {
            color: { argb: 'FFFFFFFF' },
            bold: true
        };
    });

    dto.dataExport.forEach((element: ElementData) => {
        const row = [];
        headers.forEach((header) => {
            row.push(element[header]);
        });
        worksheet.addRow(row);
    });

    worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
            const cellValue = cell.value ? cell.value.toString() : '';
            if (cellValue.length > maxLength) {
                maxLength = cellValue.length;
            }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    const timestamp = new Date().getTime();
    const directory = 'exports';
    const filePath = `${directory}/excel_${timestamp}.xlsx`;

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    await workbook.xlsx.writeFile(filePath);

    return filePath;
  }

  private base64ToBinary(base64: string): any{
    return Buffer.from(base64, 'base64');
  }

  private bufferToBase64(buffer: Buffer): string{
    return buffer.toString('base64');
  }
  
  private async getColumns(): Promise<IHeaderCustomTable[]>{
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
          children: 'Foto',
          onClick: () => console.log('click'),
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
}