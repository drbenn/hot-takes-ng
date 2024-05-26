import { Module } from '@nestjs/common';
import { HeadlineScrapeService } from './headline-scrape.service';

@Module({
  providers: [HeadlineScrapeService],
  exports: [HeadlineScrapeService]
})
export class HeadlineScrapeModule {}
