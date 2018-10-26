import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AppError, AppErrors} from './error';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public currentError = new BehaviorSubject(AppErrors.NO_ERROR);

  constructor() {
  }

  setErrorMessage(message: AppError) {
    this.currentError.next(message);
  }

}
