import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Company} from '../../company/company.model';
import {AgentSelectionEvent} from '../../agent/agent-select/agent-selection.event';
import {Subscription} from 'rxjs';
import {CompanyService} from '../../company/company.service';
import {ImportService} from '../import.service';
import {AgentService} from '../../agent/agent.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ix-import-sidebar',
  templateUrl: './import-sidebar.component.html',
  styleUrls: ['./import-sidebar.component.css']
})
export class ImportSidebarComponent implements OnInit, OnDestroy {

  /**
   * Parent form
   */
  public parentForm: FormGroup;

  /**
   * All companies known to app
   */
  public companies: Company[];

  public companiesSubscription: Subscription;

  /**
   * Triggers when agent changes
   */
  @Output() agentChange = new EventEmitter<AgentSelectionEvent>();

  constructor(
    private companyService: CompanyService,
    private agentService: AgentService,
    private importService: ImportService,
  ) {
    this.parentForm = this.importService.importForm;
  }

  /**
   * Returns all agents of current company
   */
  get agents() {
    return this.agentService.agents.get(this.parentForm.controls['companyId'].value);
  }

  ngOnInit() {
    this.companiesSubscription = this.companyService.companySubject.subscribe(newCompanies => {
      this.companies = newCompanies;
    });
  }

  /**
   * Called when agent selection changes
   * @param event - Agent selection event
   */
  onAgentChange(event: AgentSelectionEvent) {
    if (event.checked) {
      this.importService.addAgent(event.agentId);
    } else {
      this.importService.removeAgent(event.agentId);
    }
  }

  ngOnDestroy(): void {
    this.companiesSubscription.unsubscribe();
  }
}
