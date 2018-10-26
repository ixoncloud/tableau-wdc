import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportPageComponent} from './import-page.component';
import {AppThemeModule} from '../theme/app-theme.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TagSelectComponent} from './tag-select/tag-select.component';
import {ImportSidebarComponent} from './import-sidebar/import-sidebar.component';
import {TagTableComponent} from './tag-select/tag-table/tag-table.component';
import {CdkTableModule} from '@angular/cdk/table';
import {ImportService} from './import.service';
import {CompanyModule} from '../company/company.module';
import {AgentModule} from '../agent/agent.module';
import {AppCommonModule} from '../../common/app-common.module';
import {NgxJsonViewerModule} from 'ngx-json-viewer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppThemeModule,
    CdkTableModule,
    CompanyModule,
    AgentModule,
    AppCommonModule,
    NgxJsonViewerModule
  ],
  declarations: [
    ImportPageComponent,
    TagSelectComponent,
    ImportSidebarComponent,
    TagTableComponent,
  ],
  providers: [
    ImportService
  ],
  exports: [
    ImportPageComponent
  ]
})
export class ImportModule {
}
