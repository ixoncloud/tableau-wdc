import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../../environments/environment';

/**
 * Attaches IXON REST API related headers to every request
 * Also will invalidate the current access token when the api returns a 401 (unauthorized)
 */
@Injectable()
export class IXApiInterceptor implements HttpInterceptor {

  /**
   * Logger tag
   */
  private TAG = this.constructor.name;

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let apiHeaders = {};
    // Clone request and add headers
    if (req.url.startsWith('https://api.ixon.net')) {
      apiHeaders = this.handleIxApi();
    }

    if (req.url.includes('lsi')) {
      apiHeaders = this.handleIxLsiApi();
    }

    req = req.clone({
      setHeaders: apiHeaders
    });

    return next.handle(req);
  }

  /**
   * Creates headers for the Ix API
   */
  private handleIxApi(): any {
    const apiHeaders = {
      'IXapi-Version': `${environment.ixApiVersion}`,
      'IXapi-Application': environment.apiApplicationId,
    };

    // Headers sent when authenticated
    if (this.authService.isAuthenticated) {
      apiHeaders['Authorization'] = `Bearer ${this.authService.accessToken}`;
    }

    return apiHeaders;
  }

  /**
   * Creates headers for the IxLsi API
   */
  private handleIxLsiApi(): any {
    const apiHeaders = {};
    if (this.authService.authorizationToken !== '') {
      apiHeaders['Authorization'] = `Bearer ${this.authService.authorizationToken}`;
    }
    return apiHeaders;
  }
}
