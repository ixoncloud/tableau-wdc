import {inject, TestBed} from '@angular/core/testing';

import {IXApiService} from './ix-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('IXApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IXApiService]
    });
  });

  it('should be created', inject([IXApiService], (service: IXApiService) => {
    expect(service).toBeTruthy();
  }));
});
