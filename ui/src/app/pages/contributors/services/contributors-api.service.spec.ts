import { TestBed } from '@angular/core/testing';

import { ContributorsApiService } from './contributors-api.service';

describe('ContributorsApiService', () => {
  let service: ContributorsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContributorsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
