import {Component} from '@angular/core';
import {ErrorService} from '../error.service';

@Component({
  selector: 'ix-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {

  public message: string;

  constructor(private readonly errorService: ErrorService) {
    this.errorService.currentError.subscribe(newError => {
      this.message = newError.message;
    });
  }

}
