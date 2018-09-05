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

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ImportPageComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorPageComponent},
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
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
