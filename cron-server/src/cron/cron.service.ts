import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { WorkflowService } from 'src/workflow/workflow.service';
import { Logger } from 'winston';

@Injectable()
export class CronService {

  constructor(
    private workflowService: WorkflowService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ){}
  /**
   * NOTE: CronService does not need to be called in appService, or elsewhere.
   * Will run automatically. 
   * 
   * HOWEVER, this is only feature complete in development.
   * A dedicated server is required in production, therefore, when deployed on 
   * Namecheap(Shared Hosting) cPanel cron jobs are required with small PHP
   * scripts. And this module becomes useless.
   * 
   * The current solution using cPanel PHP cron jobs hits the 'xit' GET route
   * from the app.controller 12 hours apart around around 8am and 8pm eastern time.
   */

  // @Cron(CronExpression.EVERY_10_MINUTES)
  // cron30seconds() {
  //   // console.log('Cron task executed every 30 sec');
  //   // console.log(new Date());
  //   this.logger.log('info',`Cron job executed:  ${new Date()}`);
  //   // this.logger.log('log', `logging stuff! ${new Date()} \n
  //   // NEW LINE YOLO
  //   // `)
  //   this.workflowService.aiPostWorkFlow();
  // };

  
  // @Cron('0 8 * * *', {
  //     timeZone: 'America/New_York',
  // })
  // cron8am() {
  //     // console.log('=================================================');
  //     // console.log('=================================================');
  //     // console.log('=============   8:00 AM CRON JOB   ==============');
  //     // console.log(`=============    ${new Date()}     ==============`);
  //     // console.log('=================================================');
  //     // console.log('=================================================');
  //     this.workflowService.workflowActive();
  // };

  // @Cron('0 18 * * *', {
  //     timeZone: 'America/New_York',
  // })
  // cron8pm() {
  //     // console.log('=================================================');
  //     // console.log('=================================================');
  //     // console.log('=============   8:00 PM CRON JOB   ==============');
  //     // console.log(`=============    ${new Date()}     ==============`);
  //     // console.log('=================================================');
  //     // console.log('=================================================');
  //     this.workflowService.workflowActive();
  // };

}
