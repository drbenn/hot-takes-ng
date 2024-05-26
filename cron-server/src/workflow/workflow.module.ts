import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { DbService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';
import { ChatGptService } from 'src/chat-gpt/chat-gpt.service';
import { HeadlineScrapeService } from 'src/headline-scrape/headline-scrape.service';
import { ChatGptModule } from 'src/chat-gpt/chat-gpt.module';
import { HeadlineScrapeModule } from 'src/headline-scrape/headline-scrape.module';

@Module({
  imports: [
    DbModule,
    HeadlineScrapeModule,
    ChatGptModule,
  ],
  providers: [
    WorkflowService,
    DbService,
    HeadlineScrapeService,
    ChatGptService,
  ],
  exports:[WorkflowService]
})
export class WorkflowModule {}
