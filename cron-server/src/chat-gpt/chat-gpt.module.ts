import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';

@Module({
  imports: [HttpModule, DbModule],
  providers: [ChatGptService, DbService],
  exports: [ChatGptService],
})
export class ChatGptModule {



};
