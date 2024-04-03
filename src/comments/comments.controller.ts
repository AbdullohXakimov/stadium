import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CreateCommentDto })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateCommentDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
