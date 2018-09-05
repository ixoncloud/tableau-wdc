import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'ix-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm
    }
  ]
})
export class DateSelectComponent {

  /**
   * Date to be displayed
   */
  @Input() date: string;

  /**
   * Minimum date to be able to select
   */
  @Input() maxDate: string;

  /**
   * Maximum date to be able to select
   */
  @Input() minDate: string;

  /**
   * Triggered when user selects a new date
   */
  @Output() dateChange = new EventEmitter<string>();

  /**
   * Label to use for the date input
   */
  @Input() label: string;

  /**
   * Name for ngModel
   */
  @Input() formName: string;
}
