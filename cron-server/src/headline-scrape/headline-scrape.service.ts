import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { NewsStory } from 'src/app.models';

@Injectable()
export class HeadlineScrapeService {

  async getLatestHeadlines(): Promise<NewsStory[]> {
    try {
      // rss listing options: https://developer.nytimes.com/docs/rss-api/1/overview
      let parser: Parser = new Parser();
      const usFeed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/US.xml');
      const worldFeed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/World.xml');
      const mostpopularFeed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml');
      
      // set feed to pull from
      const selectedFeed = mostpopularFeed;

      // or use a random feed
      const feedArray = [usFeed, worldFeed, mostpopularFeed];
      const randomIndex: number = Math.floor(Math.random() * feedArray.length);

      const newsStories: NewsStory[] = feedArray[randomIndex].items.map(item => {
        const newsStory: NewsStory = {
          title: item.title,
          contentSnippet: item.contentSnippet,
          link: item.link,
          pubDate: new Date(item.pubDate)
        };
        return newsStory;
      });
      return newsStories;
    } catch (error) {
      console.error('Error fetching or parsing RSS feed:', error);
      throw new Error(`Error fetching or parsing RSS feed: ${error}`);
    };
  };

}
