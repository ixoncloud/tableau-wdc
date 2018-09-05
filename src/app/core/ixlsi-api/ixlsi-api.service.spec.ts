import {inject, TestBed} from '@angular/core/testing';

import {IXLsiApiService} from './ixlsi-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AgentService} from '../agent/agent.service';

describe('IXLsiApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IXLsiApiService, AgentService]
    });
  });

  it('should be created', inject([IXLsiApiService], (service: IXLsiApiService) => {
    expect(service).toBeTruthy();
  }));
});
