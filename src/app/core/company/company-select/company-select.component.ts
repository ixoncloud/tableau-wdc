import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../company.model';
import {ControlContainer, FormGroup} from '@angular/forms';

@Component({
  selector: 'ix-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent implements OnInit {
  /**
   * All companies
   */
  @Input() companies: Company[];

  /**
   * Parent form
   */
  public parentForm: FormGroup;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.parentForm = <FormGroup>this.controlContainer.control;
  }
}
