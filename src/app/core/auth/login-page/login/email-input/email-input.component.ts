import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ix-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent implements OnInit {

  @Input() parentForm: FormGroup;

  get f() {
    return this.parentForm.controls;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
