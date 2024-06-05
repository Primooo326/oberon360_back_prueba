import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { Workbook } from 'exceljs';
import * as fs from 'fs';
import { Activity } from './entities/activity.entity';
import { DownloadExcelDto, ElementActivity } from 'apps/oberon360-api/src/dtos-globals/download.excel.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity, 'MAP') private repositoryActivity: Repository<Activity>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Activity>>{
    const queryBuilder = this.repositoryActivity.createQueryBuilder("activity")
      .andWhere(qb => {
        qb.where('(activity.PREFUN_PREGUNTA LIKE :term)', {term: `%${pageOptionsDto.term}%`})
      })
      .orderBy("activity.PREFUN_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<Activity | NotFoundException>{
    const data = await this.repositoryActivity.createQueryBuilder("activity")
      .where("activity.PREFUN_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe una actividad con el id '+id);

    return data;
  }

  async create(dto: CreateActivityDto): Promise<{ message: string }> {
    const data = this.repositoryActivity.create({
      ...dto,
      PREFUN_ID: dto.PREFUN_ID,
      PREFUN_STATUS: '1'
    });

    await this.repositoryActivity.save(data);

    return { message: 'Actividad registrada exitosamente' };
  }

  async update(id: string, dto: UpdateActivityDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la actividad solicitada' });

    await this.repositoryActivity.update(id, dto);
  
    return { message: 'Actividad actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryActivity.delete(id);

    return {message: 'Actividad eliminada exitosamente'};
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

    dto.dataExport.forEach((element: ElementActivity) => {
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
}