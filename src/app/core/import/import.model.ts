/**
 * Interface for the import configuration
 */
export interface ImportConfiguration {

  /**
   * Selected company of import configuration
   */
  selectedCompany: string;

  /**
   * Starting date of import configuration
   */
  startingDate: string;

  /**
   * Ending date of import configuration
   */
  endingDate: string;

  /**
   * Agents of import configuration
   */
  agents: {
    [agentId: string]: {
      [deviceId: string]: {
        [tagId: string]: {

          /**
           * Limit of tag
           */
          limit: number;

          /**
           * Post aggregator of tag
           */
          postAggr?: string;

          /**
           * Operator for formula
           */
          formulaOperator?: string;

          /**
           * Factor for formula
           */
          formulaFactor?: number;
        }
      };
    }
  };
}

/**
 * Tag data used by import
 */
export class ImportTag {
  constructor(
    /**
     * Id of exported tag
     */
    public tagId: number,
    /**
     * Limit of exported tag
     */
    public limit?: number,
    /**
     * Post aggregator of exported tag
     */
    public postAggr?: string,
    /**
     * Operator for formula
     */
    public formulaOperator?: string,
    /**
     * Factor for formula
     */
    public formulaFactor?: number,
  ) {

  }
}

/**
 * Device data used by import
 */
export class ImportDevice {
  constructor(
    /**
     * Id of exported device
     */
    public deviceId: string,
    /**
     * Tags of exported device
     */
    public tags: ImportTag[] = [],
  ) {

  }
}

/**
 * Agent data used by import
 */
export class ImportAgent {
  constructor(
    /**
     * Id of exported agent
     */
    public agentId: string,
    /**
     * Devices of exported agent
     */
    public devices: ImportDevice[] = [],
  ) {
  }
}

/**
 * Import Configuration class
 */
export class ImportConfig {
  constructor(
    /**
     * Id of exported company
     */
    public companyId: string,
    /**
     * Exported agents
     */
    public agents: ImportAgent[],
    /**
     * Starting date of export
     */
    public startDate: string,
    /**
     * Ending date of export
     */
    public endDate: string,
  ) {
  }
}
