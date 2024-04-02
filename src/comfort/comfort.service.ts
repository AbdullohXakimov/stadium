import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './entities/comfort.entity';
import { where } from 'sequelize';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortRepo: typeof Comfort) {}
  create(createComfortDto: CreateComfortDto) {
    return this.comfortRepo.create(createComfortDto);
  }

  findAll() {
    return this.comfortRepo.findAll();
  }

  findOne(id: number) {
    return this.comfortRepo.findByPk(id);
  }

  async update(id: number, updateComfortDto: UpdateComfortDto) {
    const updatedVersion = await this.comfortRepo.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
    return updatedVersion[0][1];
  }

  remove(id: number) {
    return this.comfortRepo.destroy({ where: { id } });
  }
}
