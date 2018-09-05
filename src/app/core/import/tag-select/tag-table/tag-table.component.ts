import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagTableDataSource} from './tag-table.datasource';
import {SelectionModel} from '@angular/cdk/collections';
import {Agent} from '../../../agent/agent.model';
import {Device, Tag} from '../../../ix-api/ix-api-responses';
import {flattenArray} from '../../../../common/util/util';
import {FORMULA_OPERATOR_OPTIONS, POSTAGGR_OPTIONS, POSTAGGR_OPTIONS_NUMBER} from '../../../../common/constants';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'ix-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm
    }
  ]
})
export class TagTableComponent implements OnInit {

  /**
   * Agent for this table
   */
  @Input() agent: Agent;

  /**
   * Emits when a tag is changed in this table
   */
  @Output() tagChange = new EventEmitter<{ agentId: string, deviceId: string, tag: Tag, selected: boolean }>();

  public tags: Tag[];

  /**
   * The table columns to be displayed
   */
  displayedColumns = ['select', 'name', 'limit', 'postAggr', 'formula'];

  /**
   * Datasource for the table
   */
  dataSource = new TagTableDataSource();

  /**
   * Current selection
   */
  selection = new SelectionModel<Tag>(true, []);

  ngOnInit() {
    this.tags = flattenArray(this.agent.devices.map(device => device.tags));
    this.dataSource.updateData(this.tags);
  }

  /**
   * Checks if everything is selected
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.value.length;
    return numSelected === numRows;
  }

  /**
   * Toglles all the toggles
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.value.forEach(row => this.selection.select(row));
    this.updateTags();
  }

  /**
   * Reports all the tag states
   */
  updateTags() {
    this.agent.devices.forEach((device: Device) => {
      device.tags.forEach((tag: Tag) => {
        this.tagChange.next(
          {
            agentId: this.agent.publicId,
            deviceId: device.publicId,
            tag: tag,
            selected: this.selection.isSelected(tag)
          }
        );
      });
    });
  }

  /**
   * Called when a checkbox is toggled
   * @param row - The row to be toggled
   */
  toggleCheckBox(row) {
    this.selection.toggle(row);
    this.updateTags();
  }

  /**
   * Called when tag changes
   */
  onTagChange() {
    this.updateTags();
  }

  /**
   * Returns the post aggregator options for the specified datatype
   * @param tagType
   */
  getPostAggrOptions(tagType: string): string[] {
    if (tagType === 'bool' || tagType === 'str') {
      return POSTAGGR_OPTIONS;
    } else {
      return POSTAGGR_OPTIONS.concat(POSTAGGR_OPTIONS_NUMBER);
    }
  }

  /**
   * Returns all formula operator options
   */
  getOperatorOptions() {
    return FORMULA_OPERATOR_OPTIONS;
  }

  shouldDisableFormula(tag: Tag) {
    return tag.type === 'bool' || tag.type === 'str';
  }
}
