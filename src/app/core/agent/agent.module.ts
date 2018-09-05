import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentSelectComponent} from './agent-select/agent-select.component';
import {AgentService} from './agent.service';
import {AppThemeModule} from '../theme/app-theme.module';

@NgModule({
  imports: [
    CommonModule,
    AppThemeModule,
  ],
  declarations: [
    AgentSelectComponent
  ],
  exports: [
    AgentSelectComponent
  ]
})
export class AgentModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AgentModule,
      providers: [AgentService],
    };
  }
}
