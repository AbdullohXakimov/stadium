import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepo: typeof Region) {}

  /**
   * Create a new region
   * @param createRegionDto The data to create the region
   * @returns The created region
   */
  create(createRegionDto: CreateRegionDto) {
    return this.regionRepo.create(createRegionDto);
  }

  /**
   * Get all regions
   * @returns List of regions
   */
  findAll() {
    return this.regionRepo.findAll();
  }

  /**
   * Get a single region by id
   * @param id The id of the region to retrieve
   * @returns The region with the given id
   */
  findOne(id: number) {
    return this.regionRepo.findByPk(id);
  }

  /**
   * Update a region
   * @param id The id of the region to update
   * @param updateRegionDto The data to update the region
   * @returns The updated region
   */
  async update(id: number, updateRegionDto: UpdateRegionDto) {
    // Update the region using the repository
    const updatedVersion = await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    // Return the updated region
    return updatedVersion[0][1];
  }

  /**
   * Remove a region
   * @param id The id of the region to remove
   * @returns Success message
   */
  remove(id: number) {
    // Remove the region using the repository
    return this.regionRepo.destroy({ where: { id } });
  }
}
