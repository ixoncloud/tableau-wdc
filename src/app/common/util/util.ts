import {Tag} from '../../core/ix-api/ix-api-responses';
import * as moment from 'moment';

/**
 * Converts a javascript date to an ISO 8601 value
 * @param date - Javascript date to be converted
 */
export function getApiDate(date: moment.Moment): string {
  return date.utc().format('YYYY-MM-DD');
}

/**
 * Converts a javascript date to a datetime format tableau can parse
 * @param date - Javascript date to be converted
 */
export function getTableauDate(date: moment.Moment): string {
  return date.utc().format('DD-MM-YYYY HH:mm:ss');
}

/**
 * Returns the parsed type of the tag
 * @param tag - Tag to get the type of
 */
export function getTagType(tag: Tag): string {

  if (tag.type !== 'int') {
    return tag.type;
  }

  let type = '';

  if (!tag.signed) {
    type += 'u';
  }

  type += tag.type;

  type += tag.width;

  return type;
}

/**
 * Flattens an array
 * @param arr - The array to be flattened
 */
export function flattenArray(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
}
