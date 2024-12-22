import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findAll() {
    return this.postsRepository.find({ relations: ['comments'] });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async create(postData: Partial<Post>) {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async update(id: number, postData: Partial<Post>) {
    const post = await this.findOne(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(post, postData);
    return this.postsRepository.save(post);
  }

  async delete(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return this.postsRepository.remove(post);
  }

  async addComment(postId: number, content: string) {
    const post = await this.findOne(postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    const comment = this.commentsRepository.create({ content, post });
    return this.commentsRepository.save(comment);
  }
}
