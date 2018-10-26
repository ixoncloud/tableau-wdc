import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImportService} from '../import.service';
import {AgentService} from '../../agent/agent.service';
import {FormArray, FormGroup} from '@angular/forms';
import {Agent} from '../../agent/agent.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ix-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css']
})
export class TagSelectComponent implements OnInit, OnDestroy {

  /**
   * Parent form
   */
  public parentForm: FormGroup;

  /**
   * Agents form array
   */
  public agentsFormArray: FormArray;

  /**
   * All selected agents
   */
  public agents: Agent[] = [];

  /**
   * Subscription for agents form array
   */
  private agentsFormArraySubscription: Subscription;

  constructor(
    private readonly agentService: AgentService,
    private readonly importService: ImportService
  ) {
  }

  ngOnInit() {
    this.parentForm = this.importService.importForm;
    this.agentsFormArray = <FormArray>this.parentForm.controls['agents'];

    this.updateAgents(this.agentsFormArray.value);
    this.agentsFormArraySubscription = this.agentsFormArray.valueChanges.subscribe(newSelection => {
      this.updateAgents(newSelection);
    });
  }

  ngOnDestroy() {
    this.agentsFormArraySubscription.unsubscribe();
  }

  /**
   * Retrieves all selected agents
   */
  updateAgents(newSelection) {
    const selectedAgents = [];
    for (const selectedAgent of newSelection) {
      const agent = this.agentService.agents
        .get(this.parentForm.controls['companyId'].value)
        .find(selectedAgentOfCompany => selectedAgentOfCompany.publicId === selectedAgent.agentId);
      selectedAgents.push(agent);
    }
    this.agents = selectedAgents;
  }
}
