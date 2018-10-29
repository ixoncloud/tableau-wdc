import {Component, OnDestroy, OnInit} from '@angular/core';
import {MdlSnackbarService} from '@angular-mdl/core';
import {ErrorService} from '../error/error.service';
import {AppErrors} from '../error/error';
import {Router} from '@angular/router';

@Component({
  selector: 'ix-loading',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit, OnDestroy {

  private loadingTimeout: number;

  constructor(
    private readonly snackbar: MdlSnackbarService,
    private readonly error: ErrorService,
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    this.loadingTimeout = setTimeout(() => {
      this.snackbar.showToast('Could not connect to Tableau.', 3000);
      this.error.setErrorMessage(AppErrors.NOT_IN_TABLEAU);
      this.router.navigate(['/error']);
    }, 3000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.loadingTimeout);
  }

}
