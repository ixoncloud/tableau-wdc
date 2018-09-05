import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AppRouterModule} from './core/router/app-router.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IXApiInterceptor} from './core/ix-api/ix-api.interceptor';
import {ErrorPageComponent} from './core/error/error-page/error-page.component';
import {AppThemeModule} from './core/theme/app-theme.module';
import {DISABLE_NATIVE_VALIDITY_CHECKING} from '@angular-mdl/core';
import {AuthModule} from './core/auth/auth.module';
import {ImportModule} from './core/import/import.module';
import {CompanyModule} from './core/company/company.module';
import {AgentModule} from './core/agent/agent.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouterModule,
    AppThemeModule,
    AuthModule.forRoot(),
    AgentModule.forRoot(),
    CompanyModule.forRoot(),
    ImportModule
  ],
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IXApiInterceptor,
      multi: true
    },
    {
      provide: DISABLE_NATIVE_VALIDITY_CHECKING,
      useValue: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
