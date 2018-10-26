import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ix-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.css']
})
export class DateSelectComponent implements OnInit {
  /**
   * Minimum date to be able to select
   */
  @Input() maxDate: string;

  /**
   * Maximum date to be able to select
   */
  @Input() minDate: string;

  /**
   * Label to use for the date input
   */
  @Input() label: string;

  /**
   * Name used in form
   */
  @Input() formName: string;

  /**
   * Parent form
   */
  public parentForm: FormGroup;

  /**
   * Date select for validation
   */
  public dateSelect: FormControl;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.parentForm = <FormGroup>this.controlContainer.control;
    this.dateSelect = <FormControl>this.parentForm.controls[this.formName];
  }
}
