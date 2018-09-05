declare module tableau {
  export enum phaseEnum {
    interactivePhase = 'interactive',
    authPhase = 'auth',
    gatherDataPhase = 'gatherData'
  }

  export enum authPurposeEnum {
    ephemeral = 'ephemeral',
    enduring = 'enduring',
  }

  export enum authTypeEnum {
    none = 'none',
    basic = 'basic',
    custom = 'custom',
  }

  export enum dataTypeEnum {
    bool = 'bool',
    date = 'date',
    datetime = 'datetime',
    float = 'float',
    geometry = 'geometry',
    int = 'int',
    string = 'string',
  }

  export enum columnRoleEnum {
    dimension = 'dimension',
    measure = 'measure',
  }

  export enum columnTypeEnum {
    continuous = 'continuous',
    discrete = 'discrete',
  }

  export enum aggTypeEnum {
    sum = 'sum',
    avg = 'avg',
    median = 'median',
    count = 'count',
    countd = 'count_dist',
  }

  export enum geographicRoleEnum {
    area_code = 'area_code',
    cbsa_msa = 'cbsa_msa',
    city = 'city',
    congressional_district = 'congressional_district',
    country_region = 'country_region',
    county = 'county',
    state_province = 'state_province',
    zip_code_postcode = 'zip_code_postcode',
    latitude = 'latitude',
    longitude = 'longitude',
  }


  export enum unitsFormatEnum {
    thousands = 'thousands',
    millions = 'millions',
    billions_english = 'billions_english',
    billions_standard = 'billions_standard',
  }

  export enum numberFormatEnum {
    number = 'number',
    currency = 'currency',
    scientific = 'scientific',
    percentage = 'percentage',
  }

  export enum localeEnum {
    america = 'en-us',
    brazil = 'pt-br',
    china = 'zh-cn',
    france = 'fr-fr',
    germany = 'de-de',
    japan = 'ja-jp',
    korea = 'ko-kr',
    spain = 'es-es',
  }

  export type DataDoneCallback = () => void;

  export type InitCallback = () => void;

  export type SchemaCallback = (tables: TableInfo[], connections: StandardConnection[]) => void;

  export type ShutdownCallback = () => void;

  export interface WebDataConnector {
    getData(table: Table, doneCallback: DataDoneCallback): void;

    getSchema(schemaCallback: SchemaCallback): void;

    init(initCallBack: InitCallback): void;

    shutdown(shutdownCallback: ShutdownCallback): void;
  }

  export interface ColumnInfo {
    id: string;
    dataType: dataTypeEnum;
    aggType?: aggTypeEnum;
    alias?: string;
    description?: string;
    filterable?: boolean;
    columnRole?: columnRoleEnum;
    columnType?: columnTypeEnum;
    geoRole?: geographicRoleEnum;
    numberFormat?: numberFormatEnum;
    unitsFormat?: unitsFormatEnum;
    foreignKey: any;
  }

  export interface StandardConnection {
    alias: string;
    tables: any[];
    joins: any[];
  }

  export interface TableInfo {
    id: string;
    columns: ColumnInfo[];
    incrementColumnId?: string;
    alias?: string;
    description?: string;
    joinOnly?: boolean;
  }

  export interface Table {
    tableInfo: TableInfo;
    incrementValue: string;

    appendRows(rows: any[][]): any;
  }

  function makeConnector(): WebDataConnector;

  function registerConnector(connector: WebDataConnector): void;

  function reportProgress(progressMessage: string): void;

  function submit(): void;

  function log(msg: string): void;

  function abortWithError(msg: string): void;

  function abortForAuth(msg: string): void;

  const version: string;
  let authPurpose: authPurposeEnum;
  let authType: authTypeEnum;
  const phase: phaseEnum;
  let connectionName: string;
  let connectionData: string;
  const locale: string;
  let username: string;
  let password: any;
  const platformBuildNumber: string;
  const platformEdition: string;
  const platformVersion: string;
  const platformOS: string;
}
