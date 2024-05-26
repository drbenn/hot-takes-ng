import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkflowService } from './workflow/workflow.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private workflowService: WorkflowService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('contributors')
  async getContributors() {
    return await this.appService.getContributors();
  }

  @Get('xit')
  async newPosts() {
    this.logger.log('info',`xit newPosts Hit!:  ${new Date()}`);
    const maxPostDelayHours: number = 3/2; // Number of hours the posting cycle should conclude in 
    this.workflowService.aiPostWorkFlow(maxPostDelayHours);
  }
}
