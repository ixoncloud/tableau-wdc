import {inject, TestBed} from '@angular/core/testing';

import {InitService} from './init.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthModule} from '../auth/auth.module';
import {AgentService} from '../agent/agent.service';
import {CompanyService} from '../company/company.service';

describe('InitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, AuthModule.forRoot()],
      providers: [InitService, AgentService, CompanyService]
    });
  });

  it('should be created', inject([InitService], (service: InitService) => {
    expect(service).toBeTruthy();
  }));
});
