import TableInfo = tableau.TableInfo;
import ColumnInfo = tableau.ColumnInfo;
import {environment} from '../../../environments/environment';

/**
 * Creates the wdc table schema
 * @param tableId - The table id of the table
 * @param agentName - The name of the imported agent
 * @param cols - The columns of the table
 */
export function getWDCTableSchema(tableId: string, agentName: string, cols: ColumnInfo[]): TableInfo {
  return {
    id: tableId,
    alias: `${environment.brandingName} Data Export for Agent "${agentName}".`,
    columns: cols
  };
}

/**
 * Returns a tableau data type from the ixon type given
 * @param ixonType - IXON type to be converted
 */
export function getWDCType(ixonType: string): tableau.dataTypeEnum {
  switch (ixonType) {
    case 'bool': {
      return tableau.dataTypeEnum.bool;
    }
    case 'int': {
      return tableau.dataTypeEnum.int;
    }
    case 'float': {
      return tableau.dataTypeEnum.float;
    }
    case 'str': {
      return tableau.dataTypeEnum.string;
    }
    default: {
      return tableau.dataTypeEnum.string;
    }
  }
}
