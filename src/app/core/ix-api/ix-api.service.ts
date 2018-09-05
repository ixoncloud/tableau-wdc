import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiResponse} from './ix-api-responses';
import {tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {createEndpointObject, retryHttpRequest} from '../../common/util/api-utils';
import {Log} from '../../common/util/logger';

/**
 * Service for discovery of the IXON REST API
 */
@Injectable({
  providedIn: 'root'
})
export class IXApiService {

  /**
   * Logger tag
   */
  private TAG = this.constructor.name;

  /**
   * Quick lookup object for api endpoints
   */
  public apiEndpoints: any;

  /**
   * Subject for when the api endpoints tagChange
   */
  public apiEndpointSubject = new Subject();

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  /**
   * Tries x times to get data from discovery endpoint
   */
  discoverApiEndpoints(): Observable<ApiResponse<void>> {
    Log.d(this.TAG, 'Fetching IX API endpoints...');
    return this.http.get<ApiResponse<void>>(`${environment.ixApiDiscoveryUrl}/`)
      .pipe(
        retryHttpRequest(),
        tap((data: ApiResponse<void>) => {
          this.apiEndpoints = createEndpointObject(data);
          this.apiEndpointSubject.next();
          Log.d(this.TAG, 'Fetched IX API endpoints.');
        })
      );
  }
}
