import {Component, OnInit} from '@angular/core';
import {Tag} from '../../ix-api/tag.model';
import {ImportService} from '../import.service';
import {BehaviorSubject} from 'rxjs';
import {ImportConfiguration} from '../import.model';
import {AgentService} from '../../agent/agent.service';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'ix-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm
    }
  ]
})
export class TagSelectComponent implements OnInit {
  public selected: BehaviorSubject<ImportConfiguration>;

  constructor(
    private readonly agentService: AgentService,
    private readonly importService: ImportService
  ) {
  }

  ngOnInit() {
    this.selected = this.importService.importSelection;
  }

  /**
   * Called when tag has changed
   * @param agentId - Id of agent of changed tag
   * @param deviceId - Id of device of changed tag
   * @param tag - The tag that changed
   * @param selected - If the tag is currently selected or not
   */
  onTagChange(agentId: string, deviceId: string, tag: Tag, selected: boolean) {
    this.importService.setTagState(agentId, deviceId, tag, selected);
  }

  /**
   * Retrieves all selected agents
   */
  getAgents() {
    const selectedAgents = [];
    const agents = this.selected.value.agents;
    for (const key in agents) {
      if (agents[key] !== undefined) {
        const agent = this.agentService.agents
          .get(this.importService.importSelection.value.selectedCompany)
          .find(selectedAgentOfCompany => selectedAgentOfCompany.publicId === key);
        selectedAgents.push(agent);
      }
    }
    return selectedAgents;
  }
}
