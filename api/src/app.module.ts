import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from 'nest-mysql';

import { PostsModule } from './posts/posts.module';
import { ContributorsModule } from './contributors/contributors.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MysqlModule.forRoot({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      port: parseInt(process.env.DATABASE_PORT),      
  }),  
    PostsModule,
    ContributorsModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
