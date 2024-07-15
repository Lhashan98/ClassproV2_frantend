import { TestBed } from '@angular/core/testing';

import { AdditionalrequestService } from './additionalrequest.service';

describe('AdditionalrequestService', () => {
  let service: AdditionalrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
