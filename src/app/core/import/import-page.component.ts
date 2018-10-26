import {Component, OnInit} from '@angular/core';
import {WdcService} from '../wdc/wdc.service';
import {ImportService} from './import.service';
import {FormGroup} from '@angular/forms';

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
   * Contains the current import configuration
   */
  public importForm: FormGroup;

  constructor(
    private readonly wdcService: WdcService,
    private readonly importService: ImportService,
  ) {
  }

  /**
   * Subscribes to the importSelection
   */
  ngOnInit() {
    this.importForm = this.importService.importForm;
  }

  /**
   * Save config and submit
   */
  onSubmitPressed() {
    // WdcService.startDataImport(this.importForm.value);
  }

}
