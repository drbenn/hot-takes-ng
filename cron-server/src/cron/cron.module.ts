import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkflowService } from 'src/workflow/workflow.service';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { HeadlineScrapeModule } from 'src/headline-scrape/headline-scrape.module';
import { ChatGptModule } from 'src/chat-gpt/chat-gpt.module';
import { HeadlineScrapeService } from 'src/headline-scrape/headline-scrape.service';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    WorkflowModule,
    DbModule,
    HeadlineScrapeModule,
    ChatGptModule
  ], 
  providers: [
    CronService,
    WorkflowService,
    DbService,
    HeadlineScrapeService,
    ChatGptModule
  ],
  exports: [CronService]
})
export class CronModule {}
