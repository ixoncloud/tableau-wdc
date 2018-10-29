import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import {InitService} from '../../../init/init.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {HttpErrorResponse} from '@angular/common/http';
import {TOO_MANY_REQUESTS, UNAUTHORIZED} from 'http-status-codes';
import {OtpDialogComponent} from './otp/otp-dialog/otp-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Login dialog
 */
@Component({
  selector: 'ix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Reference to the OTP token dialog
   */
  @ViewChild(OtpDialogComponent) otpDialog: OtpDialogComponent;

  /**
   * If currently loading
   */
  public isLoading = false;

  /**
   * Login dialog formgroup
   */
  public loginForm: FormGroup;

  constructor(
    private readonly initService: InitService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbar: MdlSnackbarService,
    private readonly fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.maxLength(6), Validators.pattern(/^[0-9]{6}$/)])
    });
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
      this.snackbar.showToast('Successfully logged in', 3000);

      this.router.navigate(['/import']);
      this.isLoading = false;
    }
  }

  /**
   * Called when login errored
   * @param error - The error in question
   */
  onLoginError(error: HttpErrorResponse) {
    this.isLoading = false;
    switch (error.status) {
      case UNAUTHORIZED: {
        // The user is unauthorized because they are missing an otp token, show dialog
        if (error.error.data) {
          switch (error.error.data[0].message) {
            case 'One-Time Password required': {
              this.otpRequired();
              break;
            }
            case 'One-Time Password failed': {
              this.otpInvalid();
              break;
            }
            default: {
              this.wrongCredentials();
              break;
            }
          }
        } else {
          // The user is not using correct credentials
          this.wrongCredentials();
        }
        break;
      }
      case TOO_MANY_REQUESTS: {
        this.snackbar.showToast('You have tried to login too many times.', 3000);
        break;
      }
      case 0: {
        this.snackbar.showToast('Could not connect to IXON.', 3000);
        break;
      }
      default: {
        this.snackbar.showToast('Something went wrong. Please try again later.', 3000);
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
    this.authService.createAccessToken(this.loginForm.value)
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
    this.loginForm.controls['password'].reset();
    this.loginForm.controls['otp'].reset();
    this.snackbar.showToast('Incorrect credentials.', 3000);
  }

  /**
   * Opens the OTP dialog
   */
  private otpRequired() {
    this.otpDialog.show();
    this.snackbar.showToast('Please enter a one-time password.', 3000);
  }

  private otpInvalid() {
    this.snackbar.showToast('The entered one-time password is invalid.', 3000);

    this.loginForm.controls['otp'].reset();
    this.loginForm.controls['otp'].setErrors({'incorrect': true});
    this.otpDialog.show();
  }
}
