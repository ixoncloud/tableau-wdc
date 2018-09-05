import {inject, TestBed} from '@angular/core/testing';

import {IXApiInterceptor} from './ix-api.interceptor';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthModule} from '../auth/auth.module';

describe('IXApiInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, AuthModule.forRoot()],
      providers: [IXApiInterceptor]
    });
  });

  it('should be created', inject([IXApiInterceptor], (service: IXApiInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
