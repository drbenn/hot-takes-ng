import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from 'nest-mysql';
import { CronModule } from './cron/cron.module';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { WorkflowModule } from './workflow/workflow.module';
import { WorkflowService } from './workflow/workflow.service';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { HeadlineScrapeModule } from './headline-scrape/headline-scrape.module';
import { HeadlineScrapeService } from './headline-scrape/headline-scrape.service';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { CronService } from './cron/cron.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MysqlModule.forRoot({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      port: parseInt(process.env.DATABASE_PORT),      
    }),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
          }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ],
      })
    }),
    CronModule,
    DbModule,
    WorkflowModule,
    HeadlineScrapeModule,
    ChatGptModule
  ],
  controllers: [AppController],
  providers: [AppService, DbService, WorkflowService, HeadlineScrapeService, ChatGptService, CronService],
  exports: []
})
export class AppModule {}
