import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ErrorMessage} from './messages';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public errorMessage = new BehaviorSubject(ErrorMessage.UNKOWN_ERROR);

  constructor() {
  }

  setErrorMessage(message: ErrorMessage) {
    this.errorMessage.next(message);
  }

}
