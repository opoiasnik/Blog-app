import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'junction.proxy.rlwy.net',
      port: 27849,
      username: 'postgres',
      password: 'lmktimvohnHhOuVzpBuYdaclbxgnMxTh',
      database: 'railway',
      autoLoadEntities: true,
      logging: true,
      synchronize: true
    }),
    PostsModule,
  ],
})
export class AppModule {}
