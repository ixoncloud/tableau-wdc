/**
 * Represents a tag
 * @ignore
 */
export interface Tag {
  limit?: number;
  postAggr?: string;
  operator?: string;
  postFactor?: number;
  downsamplingInterval?: number;
  factor?: number;
  name?: string;
  width?: string;
  type?: string;
  edgeAggregator?: string;
  dataPointsLogged?: any;
  signed?: boolean;
  dataPointsUpdated?: any;
  aggregators?: {
    mean?: boolean,
    max?: boolean,
    min?: boolean,
    count?: boolean,
    first?: boolean,
  };
  retentionPolicy?: string;
  loggingInterval?: string;
  address?: string;
  valuesPerHour?: number;
  internalUse?: boolean;
  maxStringLength?: number;
  stableValue?: boolean;
  sectorData?: any;
  tagId?: number;
  unit?: string;
}
