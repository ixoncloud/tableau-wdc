import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MdlDialogComponent} from '@angular-mdl/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ix-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OtpDialogComponent implements OnInit {

  @ViewChild(MdlDialogComponent) otpDialog: MdlDialogComponent;

  @Input() formGroup: FormGroup;

  @Output() submit = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.otpDialog.close();
  }

  show() {
    const otpControl: FormControl = this.formGroup.controls['otp'] as FormControl;
    otpControl.setValidators(Validators.compose([otpControl.validator, Validators.required]));
    otpControl.updateValueAndValidity();
    this.otpDialog.show();
  }

  submitForm() {
    this.submit.emit();
  }
}
