import {inject, TestBed} from '@angular/core/testing';

import {CompanyService} from './company.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
  });

  it('should be created', inject([CompanyService], (service: CompanyService) => {
    expect(service).toBeTruthy();
  }));
});
