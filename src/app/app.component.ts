import {Component} from '@angular/core';
import {WdcService} from './core/wdc/wdc.service';

/**
 * Base component for the app
 */
@Component({
  selector: 'ix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private readonly wdcService: WdcService
  ) {
    this.wdcService.registerWebDataConnector();
  }
}
