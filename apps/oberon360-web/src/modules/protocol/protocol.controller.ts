import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query, Res } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { UpdateProtocolDto } from './dto/update-protocol.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { Response } from 'express';
import { DownloadExcelDto } from '../../../../oberon360-api/src/dtos-globals/download.excel.dto';

@ApiBearerAuth()
@ApiTags('driver')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateProtocolDto)
@Controller('protocol')
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  @Post('downloadExcel')
  async downloadExcel(@Body() dto: DownloadExcelDto, @Res() res: Response) {
    const filePath = await this.protocolService.downloadExcel(dto);
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
  @ApiPaginatedResponse(CreateProtocolDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.protocolService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.protocolService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateProtocolDto) {
    return await this.protocolService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProtocolDto) {
    return await this.protocolService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.protocolService.remove(id);
  }
}