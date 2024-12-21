import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.postsRepository.find({ relations: ['comments'] });
  }

  findOne(id: number) {
    return this.postsRepository.findOne({ where: { id }, relations: ['comments'] });
  }

  create(postData: Partial<Post>) {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async update(id: number, postData: Partial<Post>) {
    await this.postsRepository.update(id, postData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.postsRepository.delete(id);
  }

  async addComment(postId: number, content: string) {
    const post = await this.findOne(postId);
    const comment = this.commentsRepository.create({ content, post });
    return this.commentsRepository.save(comment);
  }
}
