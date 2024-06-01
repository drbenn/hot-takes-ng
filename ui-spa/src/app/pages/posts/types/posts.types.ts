export interface Post {
  id: number,
  contributor_id: number,
  headline: string,
  content_snippet: string,
  link: string,
  post: string,
  create_date: Date,
  profile_img_url?: string,
  name?: string,
  comments?: Comment[] | null;
}

export interface Comment {
  post_id: number,
  username: string,
  comment: string,
  create_date?: Date,
}
