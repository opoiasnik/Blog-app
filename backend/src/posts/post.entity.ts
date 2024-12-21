import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @BeforeInsert()
  setCreatedAt() {
    this.created_at = new Date();
  }
}
