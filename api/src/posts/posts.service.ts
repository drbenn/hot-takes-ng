/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { PostDto } from './dto/post.dto';
import { CommentDto } from './dto/comment.dto';

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

  async getNext25LatestPosts(skipAmount: number): Promise<PostDto[]> {
    const sqlQuery: string = `
      SELECT 
        ai_posts.*,
        contributors.profile_img_url,
        contributors.name
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
    const posts = Object.assign([{}], dbQuery[0]);

    const postIdMax: number = posts[0].id;
    const postIdMin: number = posts[posts.length - 1].id;

    const comments: CommentDto[] = await this.getAllRelevantComments(postIdMin, postIdMax);
    const postsWithComments: PostDto[] = this.addCommentsToPosts(posts, comments);
    if (Object.keys(posts[0]).length === 0 && posts.length === 1) {
      return null;
    } else {
      return postsWithComments;
    };
  };

  async getNext25LatestPostsForContributor(skipAmount: number, contributorId: number): Promise<PostDto[]> {
    const sqlQuery: string = `
      SELECT 
        ai_posts.*,
        contributors.profile_img_url,
        contributors.name
      FROM
        ai_posts
      INNER JOIN
        contributors
      ON
        ai_posts.contributor_id = contributors.id
      WHERE
        ai_posts.contributor_id = ${contributorId}
      ORDER BY
        create_date DESC
      LIMIT
        ${skipAmount}, 25
      `;
    const dbQuery = await this.connection.query(sqlQuery);
    const posts = Object.assign([{}], dbQuery[0]);

    const postIdMax: number = posts[0].id;
    const postIdMin: number = posts[posts.length - 1].id;

    const comments: CommentDto[] = await this.getAllRelevantComments(postIdMin, postIdMax);
    const postsWithComments: PostDto[] = this.addCommentsToPosts(posts, comments);
    if (Object.keys(posts[0]).length === 0 && posts.length === 1) {
      return null;
    } else {
      return postsWithComments;
    };
  };

  async postComment(commentDto: CommentDto): Promise<CommentDto> {
    const sqlQuery: string = `INSERT INTO comments (post_id, username, comment) 
      VALUES (
        \'${commentDto.post_id}\',
        \'${commentDto.username}\',
        \'${commentDto.comment}\'
      )`;
    const dbQuery = await this.connection.query(sqlQuery);
    const results = Object.assign([{}], dbQuery[0]);
    return results;
  };

  async getAllRelevantComments(postIdMin: number, postIdMax: number): Promise<CommentDto[]> {
    const sqlQuery: string = `SELECT * FROM 
      comments
    WHERE
      post_id BETWEEN ${postIdMin} AND ${postIdMax}
    ORDER BY 
      create_date DESC`;
    const dbQuery = await this.connection.query(sqlQuery);
    const results = Object.assign([{}], dbQuery[0]);   
    return results;
  };

  private addCommentsToPosts(posts: PostDto[], comments: CommentDto[]): PostDto[] {
    posts.forEach((post: PostDto) => {
      const relatedComments: CommentDto[] = comments.filter((comment: CommentDto) => comment.post_id === post.id);     
      if (!relatedComments) {
        post.comments = null;
      } else {
        post.comments = [...relatedComments];
      };
    });
    return posts;
  };

}
