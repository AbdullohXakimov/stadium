import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepo: typeof District) {}
  create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepo.create(createDistrictDto);
  }

  findAll() {
    return this.districtRepo.findAll();
  }

  findOne(id: number) {
    return this.districtRepo.findByPk(id);
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const updatedVersion = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    return updatedVersion[0][1];
  }

  remove(id: number) {
    return this.districtRepo.destroy({ where: { id } });
  }
}
