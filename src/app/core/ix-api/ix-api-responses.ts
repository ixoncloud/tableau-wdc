/**
 * Link for api endpoint
 * @ignore
 */
export class Link {
  constructor(
    public href: string,
    public rel: string
  ) {
  }
}

/**
 * Generic response from IX and IXlsi API
 * @ignore
 */
export interface ApiResponse<T> {
  count?: number;
  data?: T;
  status?: 'sucess' | 'error';
  links?: Link[];
  type?: string;
}

/**
 * Data returned by IX API when creating an access token
 * @ignore
 */
export interface CreateAccesstokenResponse {
  secretId: string;
}

/**
 * Data returned by IX API when creating an authorization token
 * @ignore
 */
export interface CreateAuthorizationTokenResponse {
  token: string;
}

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

/**
 * Represents a device
 * @ignore
 */
export interface Device {
  publicId: string;
  name: string;
  tags: Tag[];
}

