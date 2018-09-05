import {inject, TestBed} from '@angular/core/testing';

import {AgentService} from './agent.service';
import {HttpClientTestingModule} from '../../../../node_modules/@angular/common/http/testing';

describe('AgentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentService]
    });
  });

  it('should be created', inject([AgentService], (service: AgentService) => {
    expect(service).toBeTruthy();
  }));
});
