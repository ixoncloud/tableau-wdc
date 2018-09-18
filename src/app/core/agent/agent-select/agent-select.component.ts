import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Agent} from '../agent.model';
import {AgentSelectionEvent} from './agent-selection.event';

@Component({
  selector: 'ix-agent-select',
  templateUrl: './agent-select.component.html',
  styleUrls: ['./agent-select.component.css']
})
export class AgentSelectComponent {
  /**
   * All agents of current company
   */
  @Input() agents: Agent[];

  /**
   * Output emits when an agent has been selected
   */
  @Output() agentSelect = new EventEmitter<AgentSelectionEvent>();

  /**
   * Called when an agent has been selected
   * @param checked - If the agent has been selected or deselected
   * @param agentId - Id of the agent
   */
  onAgentSelected(checked: boolean, agentId: string) {
    this.agentSelect.emit({checked: checked, agentId: agentId});
  }
}
