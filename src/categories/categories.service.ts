import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.findAll();
  }

  findOne(id: number) {
    return this.categoryRepo.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedVersion = await this.categoryRepo.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return updatedVersion[0][1];
  }

  remove(id: number) {
    return this.categoryRepo.destroy({ where: { id } });
  }
}
