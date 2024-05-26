export interface NewsStory {
  title: string,
  contentSnippet: string,
  link: string,
  pubDate: Date
}

export interface ContributorForPrompting {
  contributor_id: number,
  gpt_prompt: string,
  ms_post_delay?: number,
  newsStory?: NewsStory
}

export interface ContributorPostBody {
  contributor_id: number,
  headline: string,
  content_snippet: string,
  link: string,
  post: string
}