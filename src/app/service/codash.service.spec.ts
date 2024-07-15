import { TestBed } from '@angular/core/testing';

import { CodashService } from './codash.service';

describe('CodashService', () => {
  let service: CodashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
