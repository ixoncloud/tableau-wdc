import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ImportConfiguration} from './import.model';
import {Tag} from '../ix-api/ix-api-responses';
import {getApiDate} from '../../common/util/util';
import * as moment from 'moment';

/**
 * Service that keeps track of import configuration
 */
@Injectable()
export class ImportService {
  /**
   * Contains the current selection
   */
  public importSelection = new BehaviorSubject<ImportConfiguration>({
    selectedCompany: undefined,
    agents: {},
    startingDate: getApiDate(moment().add(-1, 'd')),
    endingDate: getApiDate(moment())
  });

  /**
   * Sets the selected company
   * @param companyId - Company to be selected
   */
  setSelectedCompany(companyId: string) {
    this.importSelection.next({...this.importSelection.value, selectedCompany: companyId, agents: {}});
  }

  /**
   * Sets if the agent is selected or not
   * @param agentId - Id of the agent
   * @param checked - Checked state
   */
  setAgentSelected(agentId: string, checked: boolean) {
    this.importSelection.next({
      ...this.importSelection.value,
      agents: {
        ...this.importSelection.value.agents,
        [agentId]: checked ? {} : undefined
      }
    });
  }

  /**
   * Sets the tag's state
   * @param agentId - id of agent of tag
   * @param deviceId - id of device of tag
   * @param tag - The tag to be changed
   * @param selected - if the tag is selected or not
   */
  setTagState(agentId: string, deviceId: string, tag: Tag, selected: boolean) {
    this.importSelection.next(
      {
        ...this.importSelection.value,
        agents: {
          ...this.importSelection.value.agents,
          [agentId]: {
            ...this.importSelection.value.agents[agentId],
            [deviceId]: {
              ...this.importSelection.value.agents[agentId][deviceId],
              [tag.tagId]: selected ? {
                limit: tag.limit,
                postAggr: tag.postAggr,
                formulaFactor: tag.postFactor,
                formulaOperator: tag.operator,
              } : undefined,
            }
          }
        }
      }
    );
  }

  /**
   * Sets the starting date of the import data
   * @param newDate - String format of the starting date
   */
  setStartingDate(newDate: string) {
    this.importSelection.next({
      ...this.importSelection.value,
      startingDate: newDate
    });
  }

  /**
   * Sets the ending date of the import data
   * @param newDate - String format of the ending date
   */
  setEndingDate(newDate: string) {
    this.importSelection.next({
      ...this.importSelection.value,
      endingDate: newDate
    });
  }
}
