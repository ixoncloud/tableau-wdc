import {getWDCType} from '../../core/wdc/wdc-util';
import {getTableauDate} from './util';
import {Log} from './logger';
import {Agent} from '../../core/agent/agent.model';
import {CSV_SEPARATOR} from '../constants';
import * as moment from 'moment';

/**
 * Class for parsing Lsi CSV documents
 */
export class LsiCsvParser {

  /**
   * Tag for logging
   */
  private readonly TAG = this.constructor.name;

  /**
   * Lines of the CSV
   */
  private readonly lines: string[][] = [];

  /**
   * Generated array of column schemas
   */
  public readonly columnInfo: tableau.ColumnInfo[] = [];

  /**
   * Generated array of data per row
   */
  public readonly wdcData: any[] = [];

  constructor(csv: string, agent: Agent) {
    this.lines = LsiCsvParser.processCsv(csv);
    if (this.lines.length === 0) {
      tableau.abortWithError('No data returned by query');
      return;
    }
    this.columnInfo = this.generateColumnInfo(agent);
    this.wdcData = this.generateData(agent);
  }

  private static parseDatapoint(data: string, type: string): any {
    switch (type) {
      case 'bool': {
        return Boolean(data);
      }
      case 'int':
      case 'int8':
      case 'int16':
      case 'int32':
      case 'int64':
      case 'uint8':
      case 'uint16':
      case 'uint32':
      case 'uint64': {
        return parseInt(data, 10);
      }
      case 'float32':
      case 'float64': {
        return parseFloat(data);
      }
      case 'str': {
        return data;
      }
      default: {
        return data;
      }
    }
  }

  /**
   * Splits lines and comma seperated values
   * @param csv - Csv to be parsed
   * @returns - Processed csv
   */
  static processCsv(csv: string) {
    const csvLines = csv.split('\r\n');

    csvLines.splice(csvLines.length - 1, 1); // Ignore last newline

    const splitCsv = [];

    for (let i = 0; i < csvLines.length; i++) {
      // Split every line by comma
      splitCsv[i] = csvLines[i].split(CSV_SEPARATOR);
    }

    return splitCsv;
  }

  /**
   * Uses the parsed lines to generate column info for the tableau schema
   * @param agent - Agent to get tag info from
   * @returns Generated column info
   */
  private generateColumnInfo(agent: Agent) {
    const info = [];
    const headers = this.lines[0];
    for (const tagAlias of headers) {
      if (tagAlias === 'time') {
        info.push(<tableau.ColumnInfo>{
          id: tagAlias,
          alias: 'Time',
          dataType: tableau.dataTypeEnum.datetime
        });
        continue;
      }
      const [deviceId, tagId] = tagAlias.split('_');
      const device = agent.devices.find(currDevice => currDevice.publicId === deviceId);
      const tag = device.tags.find(currTag => currTag.tagId === +tagId);
      info.push(<tableau.ColumnInfo>{
        id: `${device.publicId}_${tag.tagId}`,
        alias: `${device.name} - ${tag.name}`,
        dataType: getWDCType(tag.type)
      });
    }
    return info;
  }

  /**
   * Generates an array of key/value objects to be used by tableau
   * @param agent - Agent to get tag info from
   * @returns The generated data to be used by tableau
   */
  private generateData(agent: Agent) {
    Log.d(this.TAG, 'Generating data');
    const data = [];
    const headers = this.lines[0];
    for (let i = 0; i < this.lines.length; i++) {
      if (i === 0) {
        continue; // Don't want to send headers as data
      }
      const line = this.lines[i];

      // K/v object for tableau
      const lineObj = {};

      for (let j = 0; j < headers.length; j++) {
        const tagAlias = headers[j];

        // Parse data
        if (tagAlias === 'time') {
          line[j] = getTableauDate(moment(line[j]));
          // e.g {c: 22, b: 'fdf'}
          lineObj[tagAlias] = line[j];
        } else {
          const [deviceId, tagId] = tagAlias.split('_');
          const device = agent.devices.find(currDevice => currDevice.publicId === deviceId);
          const tag = device.tags.find(currTag => currTag.tagId === +tagId);

          line[j] = LsiCsvParser.parseDatapoint(line[j], tag.type);
          lineObj[`${device.publicId}_${tag.tagId}`] = line[j];
        }
      }

      data.push(lineObj);
    }

    return data;
  }
}
