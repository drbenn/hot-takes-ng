import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContributorsService } from './contributors.service';
import { ContributorDto } from './dto/contributor.dto';

@Controller('contributors')
export class ContributorsController {

  constructor(private contributorsService: ContributorsService) {}

  @Get()
  async getAllContributors(
      @Res() res: Response
    ) {
      const contributors: ContributorDto[] | null = await this.contributorsService.getAllContributors();

      if (!contributors) {
        // TODO: handle error
      } else {
        res.status(HttpStatus.OK).send({message: 'GET contributors successful', data: JSON.stringify(contributors)});
      };
  };
}
