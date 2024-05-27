import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Get()
  async getAllContributors(
      @Res() res: Response
    ) {
      const posts: PostDto[] = await this.postsService.getAllPosts();

      if (!posts) {
        // TODO: handle error
      } else {
        res.status(HttpStatus.OK).send(JSON.stringify(posts));
      };
  };

}
