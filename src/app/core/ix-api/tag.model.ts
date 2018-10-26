/**
 * Represents a tag
 * @ignore
 */
export interface Tag {
  address?: string;
  aggregators?: {
    mean?: boolean,
    max?: boolean,
    min?: boolean,
    count?: boolean,
    first?: boolean,
  };
  dataPointsLogged?: any;
  dataPointsUpdated?: any;
  downsamplingInterval?: number;
  edgeAggregator?: string;
  factor?: number;
  internalUse?: boolean;
  loggingInterval?: string;
  maxStringLength?: number;
  name?: string;
  retentionPolicy?: string;
  sectorData?: any;
  signed?: boolean;
  stableValue?: boolean;
  tagId?: number;
  type?: string;
  unit?: string;
  valuesPerHour?: number;
  width?: string;
}
