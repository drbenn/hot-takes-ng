/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DbService } from './db/db.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(
    private dbService: DbService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  onModuleInit() {
    this.logger.log('info',`Application Initialized:  ${new Date()}`);
  };

  getHello(): string {
    return 'Hello World! Hot Takes Cron Server is running!';
  };

  async getContributors() {
    const contributors = await this.dbService.getAllContributors()
    return contributors;
  };

};
