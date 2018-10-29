import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MdlButtonModule,
  MdlCardModule,
  MdlCheckboxModule,
  MdlDialogModule,
  MdlProgressModule,
  MdlRippleModule,
  MdlShadowModule,
  MdlSnackbarModule,
  MdlSpinnerModule,
  MdlTableModule,
  MdlTextFieldModule
} from '@angular-mdl/core';
import {MdlSelectModule} from '@angular-mdl/select';
import {MdlPopoverModule} from '@angular-mdl/popover';

@NgModule({
  imports: [
    CommonModule,
    MdlSnackbarModule.forRoot(),
    MdlPopoverModule.forRoot(),
    MdlDialogModule.forRoot(),
    MdlRippleModule,
    MdlTextFieldModule,
    MdlButtonModule,
    MdlShadowModule,
    MdlCardModule,
    MdlProgressModule,
    MdlSelectModule,
    MdlCheckboxModule,
    MdlTableModule,
    MdlSpinnerModule
  ],
  declarations: [],
  exports: [
    MdlSnackbarModule,
    MdlPopoverModule,
    MdlRippleModule,
    MdlTextFieldModule,
    MdlButtonModule,
    MdlShadowModule,
    MdlCardModule,
    MdlProgressModule,
    MdlSelectModule,
    MdlCheckboxModule,
    MdlTableModule,
    MdlDialogModule,
    MdlTableModule,
    MdlSpinnerModule
  ]
})
export class AppThemeModule {
}
