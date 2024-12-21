import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(Number(id));
  }

  @Post()
  create(@Body() postData: { title: string; content: string }) {
    return this.postsService.create(postData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() postData: { title?: string; content?: string }) {
    return this.postsService.update(Number(id), postData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(Number(id));
  }

  @Post(':id/comments')
  addComment(@Param('id') id: string, @Body() commentData: { content: string }) {
    return this.postsService.addComment(Number(id), commentData.content);
  }
}
