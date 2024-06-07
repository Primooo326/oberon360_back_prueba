import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, Query, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';

@ApiBearerAuth()
@ApiTags('category-novelty')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateCategoryDto)
@Controller('category-novelty')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/findAllCategories')
  @HttpCode(200)
  @ApiPaginatedResponse(CreateCategoryDto)
  async findAllCategories(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.categoryService.findAllCategories(pageOptionsDto);
  }

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateCategoryDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.categoryService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}