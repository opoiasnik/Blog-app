import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Oleh20052005!',
      database: 'Blogs',
      autoLoadEntities: true,
      logging: true,
    }),
    PostsModule,
  ],
})
export class AppModule {}
