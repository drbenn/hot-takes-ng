/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, HttpStatus, Inject, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { CommentDto } from './dto/comment.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('posts')
export class PostsController {

  constructor(
    private postsService: PostsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

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
  async get25Posts(
    @Res() res: Response,
    @Param('id') skipAmount: number
  ) {
    const posts: PostDto[] = await this.postsService.getNext25LatestPosts(skipAmount);
    if (!posts) {
      this.logger.log('error', `Error retrieving posts on ${new Date()}. \n
        response: ${posts}
      `)
    } else {
      res.status(HttpStatus.OK).send(JSON.stringify(posts));
    };
  };

  @Get('contributor/:contributorId/:postFetchCount')
  async get25PostsForContributor(
    @Res() res: Response,
    @Param('postFetchCount') postFetchCount: number, 
    @Param('contributorId') contributorId: number
  ) {
    const posts: PostDto[] = await this.postsService.getNext25LatestPostsForContributor(postFetchCount, contributorId);
    if (!postFetchCount) {
      this.logger.log('error', `Error retrieving contributor posts on ${new Date()}. \n
        response: ${posts}
      `)
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
      this.logger.log('error', `Error creating comment on ${new Date()}. \n
        response: ${comment}
      `)
    } else {
      res.status(HttpStatus.OK).send(JSON.stringify(comment));
    };
  };

}
