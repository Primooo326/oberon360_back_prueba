import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query, Res } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { DownloadExcelDto } from './dto/download.excel.dto';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('driver')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateDriverDto)
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('findAllDrivers')
  @HttpCode(200)
  async findAllDrivers(): Promise<any> {
    return this.driverService.findAllDrivers();
  }

  @Post('downloadExcel')
  async downloadExcel(@Body() dto: DownloadExcelDto, @Res() res: Response) {
    const filePath = await this.driverService.downloadExcel(dto);
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
  @ApiPaginatedResponse(CreateDriverDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.driverService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateDriverDto) {
    return await this.driverService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateDriverDto) {
    return await this.driverService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.driverService.remove(id);
  }
}