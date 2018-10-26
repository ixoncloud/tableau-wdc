import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorService} from './error.service';
import {AppErrors} from './error';

@Injectable({
  providedIn: 'root'
})
export class ErrorGuard implements CanActivate {

  constructor(private readonly errorService: ErrorService, private readonly router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.errorService.currentError.value === AppErrors.NO_ERROR) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
