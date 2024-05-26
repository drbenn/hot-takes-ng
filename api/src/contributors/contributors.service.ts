import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { ContributorDto } from './dto/contributor.dto';

@Injectable()
export class ContributorsService {

  constructor(
    @InjectClient() private readonly connection: Connection
  ) {}

  async getAllContributors(): Promise<ContributorDto[] | null> {
    const sqlQuery: string = `SELECT id, name, profile_img_url, biography FROM contributors`;
    const dbQuery = await this.connection.query(sqlQuery);
    const results = Object.assign([{}], dbQuery[0]);
    if (Object.keys(results[0]).length === 0 && results.length === 1) {
      return null;
    } else {
      return results;
    };
};


}
