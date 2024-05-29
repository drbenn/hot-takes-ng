import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

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


}
