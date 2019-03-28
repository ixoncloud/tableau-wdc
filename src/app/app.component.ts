import {Component} from '@angular/core';
import {WdcService} from './core/wdc/wdc.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../environments/environment';

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
    private readonly wdcService: WdcService,
    private readonly titleService: Title,
  ) {
    this.setTitle(`${environment.brandingName} Web Data Connector`);
    this.wdcService.registerWebDataConnector();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
