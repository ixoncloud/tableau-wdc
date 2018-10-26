import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * Service that keeps track of import form
 */
@Injectable()
export class ImportService {

  public importForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.importForm = this.buildForm();
    this.importForm.controls['companyId'].valueChanges.subscribe(() => this.clearAgents());
    this.importForm.valueChanges.subscribe(val => console.log(JSON.stringify(val)));
  }

  private buildForm() {
    return this.fb.group({
      companyId: this.fb.control('', Validators.required), // TODO: DISABLE
      startDate: this.fb.control('', Validators.required),
      endDate: this.fb.control('', Validators.required),
      agents: this.fb.array([], [Validators.required])
    });
  }

  addAgent(agentId: string) {
    const agents = (this.importForm.controls['agents'] as FormArray);

    agents.push(this.fb.group({
      agentId: this.fb.control(agentId),
      devices: this.fb.array([], Validators.required)
    }));
  }

  removeAgent(agentId: string) {
    const agentControls = (this.importForm.controls['agents'] as FormArray);
    agentControls.removeAt(agentControls.value.findIndex(agent => agent.agentId === agentId));
  }

  private clearAgents() {
    const agentControls = (this.importForm.controls['agents'] as FormArray);
    while (agentControls.length !== 0) {
      agentControls.removeAt(0);
    }
  }
}
