import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { CreateCategoryNoveltyDto } from './dto/create-category-novelty.dto';
import { CategoryNoveltyService } from './category-novelty.service';
import { UpdateCategoryNoveltyDto } from './dto/update-category-novelty.dto';

@ApiBearerAuth()
@ApiTags('category-novelty')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateCategoryNoveltyDto)
@Controller('category-novelty')
export class CategoryNoveltyController {
  constructor(private readonly categoryNoveltyService: CategoryNoveltyService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateCategoryNoveltyDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.categoryNoveltyService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryNoveltyService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateCategoryNoveltyDto) {
    return await this.categoryNoveltyService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryNoveltyDto) {
    return await this.categoryNoveltyService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryNoveltyService.remove(id);
  }
}