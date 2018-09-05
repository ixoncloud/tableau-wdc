import {Component, ViewChild} from '@angular/core';
import {LoginDetails} from './logindetails';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import {InitService} from '../../../init/init.service';
import {MdlDialogComponent, MdlSnackbarService} from '@angular-mdl/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UNAUTHORIZED} from 'http-status-codes';

/**
 * Login dialog
 */
@Component({
  selector: 'ix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Reference to the OTP token dialog
   */
  @ViewChild(MdlDialogComponent) otpDialog: MdlDialogComponent;

  /**
   * If currently loading
   */
  public isLoading = false;

  /**
   * Model for form
   */
  public model = new LoginDetails();

  constructor(
    private readonly initService: InitService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbar: MdlSnackbarService
  ) {
  }

  /**
   * Called when login was successfull
   */
  onLoginSuccessfull() {
    if (tableau.phase === tableau.phaseEnum.authPhase) {
      // We're in auth phase so we don't want to configure anything
      tableau.submit();
    } else {
      // We logged in successfully, redirect to import page
      this.router.navigate(['/']);
      this.isLoading = false;
    }
  }

  /**
   * Called when login errored
   * @param error - The error in question
   */
  onLoginError(error: HttpErrorResponse) {
    switch (error.status) {
      case UNAUTHORIZED: {
        // The user is unauthorized because they are missing an otp token, show dialog
        if (error.error.data && error.error.data[0].message === 'One-Time Password required') {
          this.otpRequired();
        } else {
          // The user is not using correct credentials
          this.wrongCredentials();
        }
        break;
      }
      case 0: {
        this.snackbar.showToast('Could not connect to IXON.');
        break;
      }
      default: {
        this.snackbar.showToast('Something went wrong. Please try again later.');
        break;
      }
    }
  }

  /**
   * Creates access token and then fires post-auth init
   */
  submitLogin() {
    // Function might have been called by otp dialog submit, so close it
    this.otpDialog.close();

    // Loading from now on
    this.isLoading = true;

    // Create access token
    this.authService.createAccessToken(this.model)
      .pipe(
        flatMap(() => this.initService.initializeAuthenticated()),
      ).subscribe(
      () => this.onLoginSuccessfull(),
      (error: HttpErrorResponse) => this.onLoginError(error)
    );
  }

  /**
   * Shows snackbar notification and clears the form
   */
  private wrongCredentials() {
    this.isLoading = false;
    this.model.password = '';
    this.model.otp = undefined;
    this.snackbar.showToast('Incorrect credentials', 3000);
  }

  /**
   * Opens the OTP dialog
   */
  private otpRequired() {
    this.isLoading = false;
    this.otpDialog.show();
  }
}
