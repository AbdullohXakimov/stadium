import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Regions')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  /**
   * Create a new region
   * @param createRegionDto The data to create the region
   * @returns The created region
   */
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The region has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  /**
   * Get all regions
   * @returns List of regions
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Returns all regions.' })
  findAll() {
    return this.regionService.findAll();
  }

  /**
   * Get a single region by id
   * @param id The id of the region to retrieve
   * @returns The region with the given id
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a single region by id.' })
  @ApiNotFoundResponse({ description: 'Region not found.' })
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  /**
   * Update a region
   * @param id The id of the region to update
   * @param updateRegionDto The data to update the region
   * @returns The updated region
   */
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Region not found.' })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  /**
   * Delete a region
   * @param id The id of the region to delete
   * @returns Success message
   */
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Region not found.' })
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
