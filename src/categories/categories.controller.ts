import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Add Category' })
  @ApiResponse({ status: 201, type: Category })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
  @ApiOperation({ summary: 'Get all Categories' })
  @ApiResponse({ status: 201, type: Category })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 201, type: Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiResponse({ status: 201, type: Category })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }
  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiResponse({ status: 201, type: Category })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
