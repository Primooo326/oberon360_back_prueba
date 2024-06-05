import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query, Res } from '@nestjs/common';
import { ProtocolResponsibleService } from './protocol-responsible.service';
import { CreateProtocolResponsibleDto } from './dto/create-protocol-responsible.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { Response } from 'express';
import { DownloadExcelDto } from 'apps/oberon360-api/src/dtos-globals/download.excel.dto';
import { UpdateProtocolResponsibleDto } from './dto/update-protocol-responsible.dto';

@ApiBearerAuth()
@ApiTags('protocol-responsible')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateProtocolResponsibleDto)
@Controller('protocol-responsible')
export class ProtocolResponsibleController {
  constructor(private readonly protocolResponsibleService: ProtocolResponsibleService) {}

  @Post('downloadExcel')
  async downloadExcel(@Body() dto: DownloadExcelDto, @Res() res: Response) {
    const filePath = await this.protocolResponsibleService.downloadExcel(dto);
    res.download(filePath, 'data.xlsx', (err) => {
      if (err) {
        res.status(500).send({
          message: 'Error downloading file',
        });
      }
    });
  }

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateProtocolResponsibleDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.protocolResponsibleService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.protocolResponsibleService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateProtocolResponsibleDto) {
    return await this.protocolResponsibleService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProtocolResponsibleDto) {
    return await this.protocolResponsibleService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.protocolResponsibleService.remove(id);
  }
}