import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {

  constructor(
    @InjectClient() private readonly connection: Connection
  ) {}

  async getAllPosts(): Promise<PostDto[]> {
    const sqlQuery: string = `SELECT * FROM ai_posts ORDER BY create_date DESC`;
    const dbQuery = await this.connection.query(sqlQuery);
    const results = Object.assign([{}], dbQuery[0]);
    if (Object.keys(results[0]).length === 0 && results.length === 1) {
      return null;
    } else {
      return results;
    };
  };

  async getAllPostsWithImgJoin(): Promise<PostDto[]> {
    const sqlQuery: string = `
      SELECT 
        ai_posts.*,
        contributors.profile_img_url 
      FROM
        ai_posts
      INNER JOIN
        contributors
      ON
        ai_posts.contributor_id = contributors.id  
      ORDER BY
        create_date DESC
      `;
    const dbQuery = await this.connection.query(sqlQuery);
    const results = Object.assign([{}], dbQuery[0]);
    if (Object.keys(results[0]).length === 0 && results.length === 1) {
      return null;
    } else {
      return results;
    };
  };

  async getNext10LatestPosts(skipAmount: number | string): Promise<PostDto[]> {
    const sqlQuery: string = `SELECT * FROM ai_posts ORDER BY create_date DESC LIMIT ${skipAmount}, 10`;
    const dbQuery = await this.connection.query(sqlQuery);
    const results = Object.assign([{}], dbQuery[0]);
    if (Object.keys(results[0]).length === 0 && results.length === 1) {
      return null;
    } else {
      return results;
    };
  };

  async getNext20LatestPosts(skipAmount: number): Promise<PostDto[]> {
    const sqlQuery: string = `
      SELECT 
        ai_posts.*,
        contributors.profile_img_url 
      FROM
        ai_posts
      INNER JOIN
        contributors
      ON
        ai_posts.contributor_id = contributors.id  
      ORDER BY
        create_date DESC
      LIMIT
        ${skipAmount}, 25
      `;
    const dbQuery = await this.connection.query(sqlQuery);
    const results = Object.assign([{}], dbQuery[0]);
    
    if (Object.keys(results[0]).length === 0 && results.length === 1) {
      return null;
    } else {
      return results;
    };
  };

}
