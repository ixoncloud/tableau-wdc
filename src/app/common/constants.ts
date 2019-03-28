/**
 * Standard post aggregator options
 */
import {environment} from '../../environments/environment';

export const POSTAGGR_OPTIONS = [
  'first', 'last', 'mode', 'count'
];

/**
 * Extra post aggregator options for numbers
 */
export const POSTAGGR_OPTIONS_NUMBER = [
  'min',
  'max',
];

/**
 * All formula operator options
 */
export const FORMULA_OPERATOR_OPTIONS = [
  '+',
  '-',
  '/',
  '*'
];
/**
 * Separator of CSV file
 */
export const CSV_SEPARATOR = ',';
/**
 * Name of Tableau WDC Connection
 */
export const CONNECTION_NAME = `${environment.brandingName} Tableau WDC`;
