import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanySelectComponent} from './company-select/company-select.component';
import {CompanyService} from './company.service';
import {AppThemeModule} from '../theme/app-theme.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppThemeModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanySelectComponent
  ],
  exports: [
    CompanySelectComponent
  ]
})
export class CompanyModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CompanyModule,
      providers: [CompanyService],
    };
  }
}
