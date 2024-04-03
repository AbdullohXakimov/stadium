import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentRepo: typeof Comment) {}

  // Create a new comment
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepo.create(createCommentDto);
  }

  // Get all comments
  async findAll() {
    return await this.commentRepo.findAll();
  }

  // Find a comment by ID
  async findOne(id: number) {
    return await this.commentRepo.findByPk(id);
  }

  // Update a comment by ID
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const [updatedRowsCount, updatedComments] = await this.commentRepo.update(
      updateCommentDto,
      {
        where: { id },
        returning: true, // Return the updated rows
      },
    );

    if (updatedRowsCount === 0) {
      throw new Error(`Comment with ID ${id} not found.`);
    }

    return updatedComments[0]; // Return the updated comment
  }

  // Remove a comment by ID
  async remove(id: number) {
    const deletedRowsCount = await this.commentRepo.destroy({
      where: { id },
    });

    if (deletedRowsCount === 0) {
      throw new Error(`Comment with ID ${id} not found.`);
    }

    return `Comment with ID ${id} has been deleted.`;
  }
}
