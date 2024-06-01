/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { CommentDto } from './dto/comment.dto';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Res() res: Response
  ) {
    const posts: PostDto[] = await this.postsService.getAllPostsWithImgJoin();
    if (!posts) {
      // TODO: handle error
    } else {
      res.status(HttpStatus.OK).send(JSON.stringify(posts));
    };
  };

  @Get(':id')
  async get20Posts(
    @Res() res: Response,
    @Param('id') id: number
  ) {
    const posts: PostDto[] = await this.postsService.getNext20LatestPosts(id);
    if (!posts) {
      // TODO: handle error
    } else {
      res.status(HttpStatus.OK).send(JSON.stringify(posts));
    };
  };

  @Post('comment')
  async createComment(
    @Res() res: Response,
    @Body() commentDto: CommentDto
  ) {
    const comment: CommentDto = await this.postsService.postComment(commentDto);    
    if (!comment) {
      // TODO: handle error
    } else {
      res.status(HttpStatus.OK).send(JSON.stringify(comment));
    };
  };

}
