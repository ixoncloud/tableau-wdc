import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDetails} from './login-page/login/logindetails';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {ApiResponse, CreateAccesstokenResponse, CreateAuthorizationTokenResponse} from '../ix-api/ix-api-responses';
import {IXApiService} from '../ix-api/ix-api.service';
import {AuthStorage} from './auth-storage';
import {map, tap} from 'rxjs/operators';
import {createBasicAuthString} from './auth-utils';
import {Log} from '../../common/util/logger';
import {ImportConfig} from '../import/import.model';
import * as moment from 'moment';

/**
 * Service used for getting authenticated for both the IX API and IXlsi API
 */
@Injectable()
export class AuthService {

  /**
   * Logger tag
   */
  private TAG = this.constructor.name;

  /**
   * Subject for when auth state has changed
   */
  public authSubject = new Subject();

  /**
   * Has authenticated loaded
   */
  public hasLoadedAuth = false;

  /**
   * Access token used for authentication with the IX API
   */
  accessToken = '';

  /**
   * Authorization token used for authentication with the IXlsi API
   */
  authorizationToken = '';

  /**
   * Used to simplify authentication checking
   */
  get isAuthenticated() {
    return this.accessToken !== '';
  }

  constructor(
    private readonly http: HttpClient,
    private readonly ixApiService: IXApiService,
  ) {
  }

  /**
   * Tries to load access token from tableau password storage and validates it's expiry
   * @returns If successfully logged in
   */
  loadAccessTokenFromPasswordStorage(): boolean {
    this.hasLoadedAuth = true;
    Log.d(this.TAG, 'Trying to load access token from tableau password storage...');
    const data = tableau.password;
    if (data) {
      Log.d(this.TAG, 'Access token found.');
      const authStorage: AuthStorage = JSON.parse(data);
      if (authStorage.expire >= moment().valueOf()) {
        this.accessToken = authStorage.accessToken;
        this.authSubject.next();
        return true;
      } else {
        this.removeAccessToken();
        Log.d(this.TAG, 'Access token expired!');
        this.authSubject.next();
      }
    } else {
      Log.d(this.TAG, 'Access token not found');
      this.authSubject.next();
    }
    return false;
  }

  /**
   * Deletes access token from the client
   */
  removeAccessToken() {
    this.accessToken = '';
    tableau.password = undefined;
  }

  /**
   * Uses login details to create an access token
   * @param details - Login details to be used when authenticating
   */
  createAccessToken(details: LoginDetails): Observable<string> {
    const authString = createBasicAuthString(details);
    return this.http.post(`${this.ixApiService.apiEndpoints['AccessTokenList']}?fields=secretId`,
      {expiresIn: environment.ixApiExpire},
      {
        headers: {
          Authorization: `Basic ${authString}`
        }
      }
    ).pipe(
      map((res: ApiResponse<CreateAccesstokenResponse>) => res.data.secretId),
      tap((accessToken: string) => this.onAccessTokenCreated(accessToken))
    );
  }

  /**
   * Callback for when access token has been created
   * @param accessToken - Access token that has been created
   */
  private onAccessTokenCreated(accessToken: string) {
    Log.d(this.TAG, 'Created new access token!');
    this.hasLoadedAuth = true;
    this.authSubject.next();
    this.setAccessToken(accessToken, moment().add(environment.ixApiExpire, 's'));
  }

  /**
   * Set access token with expire
   * @param token - Token to be saved
   * @param expire - When the access token expires
   */
  setAccessToken(token: string, expire: moment.Moment) {
    this.accessToken = token;
    tableau.password = JSON.stringify(new AuthStorage(token, expire.valueOf()));
  }

  /**
   * Get authorzation token
   * @param config - Configuration to be used to get the company id
   */
  createAuthorizationToken(config: ImportConfig): Observable<string> {
    return this.http.post<ApiResponse<CreateAuthorizationTokenResponse>>(`${this.ixApiService.apiEndpoints['AuthorizationTokenList']}`,
      {expiresIn: environment.lsiApiExpire}, {
        headers: {
          'IXapi-Company': config.companyId
        }
      }
    ).pipe(
      map((res: ApiResponse<CreateAuthorizationTokenResponse>) => res.data.token),
      tap((token: string) => {
        this.authorizationToken = token;
        Log.d(this.TAG, 'Created new authorization token!');
      })
    );
  }
}
