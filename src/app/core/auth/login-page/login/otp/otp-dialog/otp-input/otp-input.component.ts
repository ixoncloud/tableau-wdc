import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ix-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css']
})
export class OtpInputComponent implements OnInit {

  @Input() parentForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  get f() {
    return this.parentForm.controls;
  }

}
