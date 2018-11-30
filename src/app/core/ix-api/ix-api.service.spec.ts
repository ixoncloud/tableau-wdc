import {getTestBed, TestBed} from '@angular/core/testing';

import {IXApiService} from './ix-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiResponse, Link} from './ix-api-responses';
import {environment} from '../../../environments/environment';

describe('IXApiService', () => {
  let injector: TestBed;
  let service: IXApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IXApiService]
    });
    injector = getTestBed();
    service = injector.get(IXApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should correctly fetch and transform a discovery response', () => {
    const dummyDisovery = [
      new Link('foo.bar', 'foo'),
      new Link('nu.nl', 'nu'),
      new Link('bing.com', 'bing'),
      new Link('google.com', 'google')
    ];
    const mockResponse = <ApiResponse<void>>{
      links: dummyDisovery
    };
    service.discoverApiEndpoints().subscribe(() => {
      expect(Object.values(service.apiEndpoints).length).toBe(4);
      for (const link of dummyDisovery) {
        expect(service.apiEndpoints[link.rel]).toBe(link.href);
      }
    });

    const req = httpMock.expectOne(`${environment.ixApiDiscoveryUrl}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
