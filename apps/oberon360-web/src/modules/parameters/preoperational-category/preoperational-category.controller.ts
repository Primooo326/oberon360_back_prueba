import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { PreoperationalCategoryService } from './preoperational-category.service';
import { CreatePreoperationalCategoryDto } from './dto/create-preoperational-category.dto';
import { UpdatePreoperationalCategoryDto } from './dto/update-preoperational-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';

@ApiBearerAuth()
@ApiTags('preoperational-category')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreatePreoperationalCategoryDto)
@Controller('preoperational-category')
export class PreoperationalCategoryController {
  constructor(private readonly preoperationalCategoryService: PreoperationalCategoryService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreatePreoperationalCategoryDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.preoperationalCategoryService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.preoperationalCategoryService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreatePreoperationalCategoryDto) {
    return await this.preoperationalCategoryService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePreoperationalCategoryDto) {
    return await this.preoperationalCategoryService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.preoperationalCategoryService.remove(id);
  }
}