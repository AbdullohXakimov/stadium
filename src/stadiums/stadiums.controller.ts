import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'; // Import necessary decorators
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { Stadium } from './entities/stadium.entity';// Import the Stadium model

@ApiTags('Stadiums') // Add a tag to group endpoints in Swagger UI
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Stadium created successfully',
    type: Stadium,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all stadiums',
    type: [Stadium],
  })
  findAll() {
    return this.stadiumsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Stadium found', type: Stadium })
  @ApiNotFoundResponse({ description: 'Stadium not found' })
  findOne(@Param('id') id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Stadium updated successfully',
    type: Stadium,
  })
  @ApiNotFoundResponse({ description: 'Stadium not found' })
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, updateStadiumDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Stadium deleted successfully' })
  @ApiNotFoundResponse({ description: 'Stadium not found' })
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }
}
