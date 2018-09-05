import {Component, OnInit} from '@angular/core';
import {WdcService} from '../wdc/wdc.service';
import {ImportService} from './import.service';
import {ImportConfiguration} from './import.model';

@Component({
  selector: 'ix-import',
  templateUrl: './import-page.component.html',
  styleUrls: ['./import-page.component.scss']
})
export class ImportPageComponent implements OnInit {

  /**
   * Tag for logging
   */
  private TAG = this.constructor.name;

  /**
   * The currently amount of selected tags
   */
  public selectedTagCount: number;

  /**
   * Contains the current import configuration
   */
  private importConfiguration: ImportConfiguration;

  constructor(
    private readonly wdcService: WdcService,
    private readonly importService: ImportService
  ) {
  }

  /**
   * Subscribes to the importSelection
   */
  ngOnInit() {
    this.importService.importSelection.subscribe(selection => {
      this.updateSelectedTagCount(selection);
    });
  }

  /**
   * Save config and submit
   */
  onSubmitPressed() {
    WdcService.startDataImport(this.importConfiguration);
  }

  /**
   * Updates the selected tag count
   * @param selection - The selection to be used to calculate the new count
   */
  private updateSelectedTagCount(selection: ImportConfiguration) {
    this.importConfiguration = selection;
    this.selectedTagCount = 0;
    for (const agent of Object.values(selection.agents)) {
      if (agent !== undefined) {
        for (const device of Object.values(agent)) {
          this.selectedTagCount += Object.values(device).filter(currDevice => currDevice !== undefined).length;
        }
      }
    }
  }
}
