import { Test, TestingModule } from '@nestjs/testing';
import { HeadlineScrapeService } from './HeadlineScrapeService';

describe('HeadlineScrapeService', () => {
  let service: HeadlineScrapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadlineScrapeService],
    }).compile();

    service = module.get<HeadlineScrapeService>(HeadlineScrapeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
