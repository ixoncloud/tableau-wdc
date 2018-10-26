import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {LoggedinGuard} from '../auth/loggedin.guard';
import {ImportModule} from '../import/import.module';
import {ErrorPageComponent} from '../error/error-page/error-page.component';
import {LoginPageComponent} from '../auth/login-page/login-page.component';
import {AuthModule} from '../auth/auth.module';
import {ImportPageComponent} from '../import/import-page.component';
import {LoadingPageComponent} from '../loading/loading-page.component';
import {ErrorGuard} from '../error/error.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoadingPageComponent},
  {path: 'import', component: ImportPageComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorPageComponent, canActivate: [ErrorGuard]},
  {path: 'login', component: LoginPageComponent, canActivate: [LoggedinGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    ImportModule,
    AuthModule.forRouter(),
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: [],
  providers: [
    AuthGuard,
    LoggedinGuard,
    ErrorGuard,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
