import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login-page/login/login.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppThemeModule} from '../theme/app-theme.module';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {LoggedinGuard} from './loggedin.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppThemeModule
  ],
  declarations: [
    LoginComponent,
    LoginPageComponent,
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
