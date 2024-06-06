import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { CreateSubCategoryNoveltyDto } from './dto/create-sub-category-novelty.dto';
import { SubCategoryNoveltyService } from './sub-category-novelty.service';
import { UpdateSubCategoryNoveltyDto } from './dto/update-sub-category-novelty.dto';

@ApiBearerAuth()
@ApiTags('sub-category-novelty')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateSubCategoryNoveltyDto)
@Controller('sub-category-novelty')
export class SubCategoryNoveltyController {
  constructor(private readonly subCategoryService: SubCategoryNoveltyService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateSubCategoryNoveltyDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.subCategoryService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subCategoryService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateSubCategoryNoveltyDto) {
    return await this.subCategoryService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSubCategoryNoveltyDto) {
    return await this.subCategoryService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subCategoryService.remove(id);
  }
}