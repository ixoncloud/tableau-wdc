import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {IXApiService} from '../ix-api/ix-api.service';
import {IXLsiApiService} from '../ixlsi-api/ixlsi-api.service';
import {AgentService} from '../agent/agent.service';
import {Log} from '../../common/util/logger';
import {UNAUTHORIZED} from 'http-status-codes';
import {flatMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CompanyService} from '../company/company.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Company} from '../company/company.model';
import {ErrorService} from '../error/error.service';
import {ErrorMessage} from '../error/messages';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  private readonly TAG = this.constructor.name;

  constructor(
    private readonly zone: NgZone,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly ixApiService: IXApiService,
    private readonly ixLsiApiService: IXLsiApiService,
    private readonly companyService: CompanyService,
    private readonly agentService: AgentService,
    private readonly errorService: ErrorService,
  ) {
  }

  /**
   * Initializes all the services within the app
   */
  public initializeApp() {
    let initialization;
    // Enables tagChange detection since we're
    return this.zone.run(() => {
      // Try load access token from localstorage
      const isLoggedIn = this.authService.loadAccessTokenFromPasswordStorage();

      // Try discover ix api endpoints
      initialization = this.ixApiService.discoverApiEndpoints();

      // If logged in, try create authorization token and discover ixlsi api
      if (isLoggedIn) {
        initialization = initialization.pipe(
          flatMap(() => this.initializeAuthenticated()),
        );
      }
      // When the sequence errors, page will be unusable so redirect to error page
      initialization = initialization.pipe(
        tap(null, (error) => this.onInitializationError(error))
      );

      return initialization;
    });
  }

  private onInitializationError(error: any) {
    Log.e(this.TAG, 'Could not fetch all API endpoints');
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case UNAUTHORIZED: {
          Log.e(this.TAG, 'Access token invalid, sending user to login screen');
          this.authService.removeAccessToken();
          this.ixApiService.discoverApiEndpoints().subscribe(() => {
            this.router.navigate(['/login']);
          });
          break;
        }
        default: {
          Log.e(this.TAG, 'Unhandled errror response, showing error page');
          this.errorService.setErrorMessage(ErrorMessage.API_ERROR);
          this.router.navigate(['/error']);
          break;
        }
      }
    }
  }

  /**
   * Initialization that happens when the user logs in
   */
  public initializeAuthenticated(): Observable<{}> {
    return this.companyService.loadCompanies().pipe(
      flatMap((companies: Company[]) => this.agentService.loadAgents(companies))
    );
  }
}
