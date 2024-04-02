import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comfort } from './entities/comfort.entity';

ApiTags("Comfort")

@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}
  @ApiOperation({ summary: 'add new comfort' })
  @ApiResponse({ status: 201, type: Comfort })
  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({ summary: 'get all comforts' })
  @ApiResponse({ status: 200, type: Comfort })
  @Get()
  findAll() {
    return this.comfortService.findAll();
  }

  @ApiOperation({ summary: 'get comfort by id' })
  @ApiResponse({ status: 200, type: Comfort })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortService.findOne(+id);
  }
  @ApiOperation({ summary: 'update comfort by ID' })
  @ApiResponse({ status: 201, type: Comfort })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.update(+id, updateComfortDto);
  }
  @ApiOperation({ summary: 'delete comfort by ID' })
  @ApiResponse({ status: 201, type: Comfort })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
