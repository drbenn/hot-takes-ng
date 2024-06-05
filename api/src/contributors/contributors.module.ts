import { Module } from '@nestjs/common';
import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';


@Module({
  providers: [ContributorsService],
  controllers: [ContributorsController],
})
export class ContributorsModule {}
