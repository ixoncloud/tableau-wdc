import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login-page/login/login.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppThemeModule} from '../theme/app-theme.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {LoggedinGuard} from './loggedin.guard';
import {EmailInputComponent} from './login-page/login/email-input/email-input.component';
import {PasswordInputComponent} from './login-page/login/password-input/password-input.component';
import {OtpDialogComponent} from './login-page/login/otp/otp-dialog/otp-dialog.component';
import {OtpInputComponent} from './login-page/login/otp/otp-dialog/otp-input/otp-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppThemeModule
  ],
  declarations: [
    LoginComponent,
    LoginPageComponent,
    EmailInputComponent,
    PasswordInputComponent,
    OtpDialogComponent,
    OtpInputComponent,
  ],
  exports: [
    LoginPageComponent,
  ]
})
export class AuthModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }

  static forRouter(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthGuard, LoggedinGuard]
    };
  }
}
