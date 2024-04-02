import { Injectable } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stadium } from './entities/stadium.entity';


@Injectable()
export class StadiumsService {
  constructor(@InjectModel(Stadium) private stadiumRepo: typeof Stadium) {}

  async create(createStadiumDto: CreateStadiumDto) {
    return await this.stadiumRepo.create(createStadiumDto);
  }

  async findAll() {
    return await this.stadiumRepo.findAll();
  }

  async findOne(id: number) {
    return await this.stadiumRepo.findByPk(id);
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    // Assuming you have a method to find and update the stadium by id
    const stadium = await this.stadiumRepo.findByPk(id);
    if (!stadium) {
      throw new Error(`Stadium with id ${id} not found.`);
    }
    return await stadium.update(updateStadiumDto);
  }

  async remove(id: number) {
    // Assuming you have a method to find and delete the stadium by id
    const stadium = await this.stadiumRepo.findByPk(id);
    if (!stadium) {
      throw new Error(`Stadium with id ${id} not found.`);
    }
    await stadium.destroy();
    return `Stadium with id ${id} has been deleted successfully.`;
  }
}
