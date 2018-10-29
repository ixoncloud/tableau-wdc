import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ix-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {

  @Input() parentForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  get f() {
    return this.parentForm.controls;
  }

}
