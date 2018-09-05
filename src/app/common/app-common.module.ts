import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateSelectComponent} from './date-select/date-select.component';
import {AppThemeModule} from '../core/theme/app-theme.module';
import {DpDatePickerModule} from 'ng2-date-picker';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppThemeModule,
    DpDatePickerModule
  ],
  declarations: [
    DateSelectComponent
  ],
  exports: [
    DateSelectComponent
  ]
})
export class AppCommonModule {
}
