import {inject} from '@angular/core/testing';
import {flattenArray, getApiDate, getTableauDate, getTagType} from './util';
import {Tag} from '../../core/ix-api/ix-api-responses';
import * as moment from 'moment';

describe('GeneralUtils', function () {
  it('should format the date for the Ix API', inject([], () => {
    const formattedDate = getApiDate(moment.unix(1534789322));
    expect(formattedDate).toEqual('2018-08-20');
  }));

  it('should format the date for tableau', inject([], () => {
    const formattedDate = getTableauDate(moment.unix(1534789322));
    expect(formattedDate).toEqual('20-08-2018 18:22:02');
  }));

  it('should return the correct tag type', inject([], () => {
    const tags: Tag[] = [
      {type: 'int', signed: false, width: '64'},
      {type: 'string', signed: true, width: '18'},
      {type: 'int', signed: true, width: '32'},
      {type: 'bool', signed: false, width: '128'}
    ];

    const expectedResults: string[] = [
      'uint64',
      'string',
      'int32',
      'bool',
    ];

    const results = tags.map(tag => getTagType(tag));

    expect(results).toEqual(expectedResults);
  }));

  it('should flatten the array', inject([], () => {
    const arr = [undefined, [1, 2, 'blue', 'red', [['thing']]], [[true, 'bar'], [-Infinity]]];

    const flatArrRef = [undefined, 1, 2, 'blue', 'red', 'thing', true, 'bar', -Infinity];
    const flatArr = flattenArray(arr);

    expect(flatArr).toEqual(flatArrRef);
  }));
});
