import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }

    const post = await this.postsService.findOne(idNumber);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  @Post()
  async create(@Body() postData: { title: string; content: string }) {
    if (!postData.title || !postData.content) {
      throw new HttpException(
        'Title and content are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (postData.title.length > 255) {
      throw new HttpException(
        'Title must be less than 255 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.postsService.create(postData);
    } catch (error) {
      throw new HttpException(
        'Error creating post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() postData: { title?: string; content?: string },
  ) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }

    if (postData.title && postData.title.length > 255) {
      throw new HttpException(
        'Title must be less than 255 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.postsService.update(idNumber, postData);
    } catch (error) {
      throw new HttpException(
        'Error updating post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.postsService.delete(idNumber);
    } catch (error) {
      throw new HttpException(
        'Error deleting post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') id: string,
    @Body() commentData: { content: string },
  ) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }

    if (!commentData.content) {
      throw new HttpException(
        'Comment content is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.postsService.addComment(idNumber, commentData.content);
    } catch (error) {
      throw new HttpException(
        'Error adding comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
