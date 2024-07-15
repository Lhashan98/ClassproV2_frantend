import { TestBed } from '@angular/core/testing';

import { NewcourseServiceService } from './newcourse-service.service';

describe('NewcourseServiceService', () => {
  let service: NewcourseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewcourseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
