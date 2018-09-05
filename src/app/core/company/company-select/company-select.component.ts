import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from '../company.model';

@Component({
  selector: 'ix-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent {

  /**
   * If input should be disabled
   */
  @Input() disabled: boolean;

  /**
   * All companies
   */
  @Input() companies: Company[];

  /**
   * Output for when a company has been selected
   */
  @Output() companySelect = new EventEmitter<String>();

  constructor() {
  }

  /**
   * Called when a new company has been selected
   * @param companyId
   */
  onChange(companyId: string) {
    this.companySelect.emit(companyId);
  }

}
