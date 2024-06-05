import { Controller, Get, HttpStatus, Inject, Logger, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContributorsService } from './contributors.service';
import { ContributorDto } from './dto/contributor.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('contributors')
export class ContributorsController {

  constructor(
    private contributorsService: ContributorsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @Get()
  async getAllContributors(
      @Res() res: Response
    ) {
      const contributors: ContributorDto[] | null = await this.contributorsService.getAllContributors();

      if (!contributors) {
        this.logger.log('error', `Error retrieving contributors on ${new Date()}. \n
          response: ${contributors}
        `)
      } else {
        res.status(HttpStatus.OK).send(JSON.stringify(contributors));
      };
  };
}
