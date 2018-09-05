import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from '../../company/company.model';
import {AgentSelectionEvent} from '../../agent/agent-select/agent-selection.event';
import {BehaviorSubject} from 'rxjs';
import {CompanyService} from '../../company/company.service';
import {ImportService} from '../import.service';
import {ImportConfiguration} from '../import.model';
import {AgentService} from '../../agent/agent.service';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'ix-import-sidebar',
  templateUrl: './import-sidebar.component.html',
  styleUrls: ['./import-sidebar.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm
    }
  ]
})
export class ImportSidebarComponent implements OnInit {

  /**
   * All companies known to app
   */
  public companies: BehaviorSubject<Company[]>;

  /**
   * Import configuration
   */
  public selected: BehaviorSubject<ImportConfiguration>;

  /**
   * Triggered when agent changes
   */
  @Output() agentChange = new EventEmitter<AgentSelectionEvent>();

  constructor(
    private companyService: CompanyService,
    private agentService: AgentService,
    private importService: ImportService,
  ) {
  }

  /**
   * Returns all agents of current company
   */
  get agents() {
    return this.agentService.agents.get(this.importService.importSelection.value.selectedCompany);
  }

  ngOnInit() {
    this.companies = this.companyService.companySubject;
    this.selected = this.importService.importSelection;
  }

  /**
   * Called when agent selection changes
   * @param event - Agent selection event
   */
  onAgentChange(event: AgentSelectionEvent) {
    this.importService.setAgentSelected(event.agentId, event.checked);
  }

  /**
   * Called when the company changes
   * @param companyId - The id of the new company
   */
  onCompanyChange(companyId: string) {
    this.importService.setSelectedCompany(companyId);
  }

  /**
   * Called when the ending date changes
   * @param newDate - New ending date
   */
  onEndingDateChange(newDate: string) {
    this.importService.setEndingDate(newDate);
  }

  /**
   * Called when the starting date changes
   * @param newDate - New starting date
   */
  onStartingDateChange(newDate: string) {
    this.importService.setStartingDate(newDate);
  }
}
