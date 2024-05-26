import { Inject, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai'; 
import { ContributorForPrompting } from 'src/app.models';
import { DbService } from 'src/db/db.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class ChatGptService {
  constructor(
    private dbService: DbService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  
  async generateAiPost(contributor: ContributorForPrompting): Promise<void> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // const oldprompt: string = 'A current news headline is \'A game of Jenga\': Inside the perilous Baltimore bridge clean-up\’. Write a snarky tweet with 280 characters or less as the character of \‘Lance Styro\’ who is closely based on the actor Owen Wilson, Lance Styro has a catch phrase of \‘Absolutely!\’ Which may or may not be used in the tweet. Return the quote in JSON format';
    const prompt: string = `A current news headline is: ${contributor.newsStory?.title}.
      The headline is accompanied with some more detail of: ${contributor.newsStory?.contentSnippet}.
      ${contributor.gpt_prompt}.
      Return the quote in JSON format with a key of \'post\'`;
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "assistant", content: prompt },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });
    const response: string = completion.choices[0].message.content;
    const json = JSON.parse(response);
    this.logger.log('log', `GPT Response for contributor_id: ${contributor.contributor_id} on ${new Date()}. \n
    response: ${response}
    `)
    const post: string = json["post"];

    // response may include single/double quotes or backticks so must escape those first.
    const escapedPost = post.replace(/['"`]/g, '\\$&');
    this.dbService.insertPost(contributor, escapedPost);
  };
}
