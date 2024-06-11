import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { PreoperationalSubcategoryService } from './preoperational-subcategory.service';
import { CreatePreoperationalSubcategoryDto } from './dto/create-preoperational-subcategory.dto';
import { UpdatePreoperationalSubcategoryDto } from './dto/update-preoperational-subcategory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';

@ApiBearerAuth()
@ApiTags('preoperational-subcategory')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreatePreoperationalSubcategoryDto)
@Controller('preoperational-subcategory')
export class PreoperationalSubcategoryController {
  constructor(private readonly preoperationalSubcategoryService: PreoperationalSubcategoryService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreatePreoperationalSubcategoryDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.preoperationalSubcategoryService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.preoperationalSubcategoryService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreatePreoperationalSubcategoryDto) {
    return await this.preoperationalSubcategoryService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePreoperationalSubcategoryDto) {
    return await this.preoperationalSubcategoryService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.preoperationalSubcategoryService.remove(id);
  }
}