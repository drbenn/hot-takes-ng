export class PostDto {
  id: number;
  contributor_id: number;
  headline: string;
  content_snippet: string;
  link: string;
  post: string;
  create_date: Date;
  profile_img_url?: string;
  name?: string;
}
