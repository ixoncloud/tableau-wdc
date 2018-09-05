import {Injectable} from '@angular/core';
import {forkJoin, Observable, Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Log} from '../../common/util/logger';
import {IXLsiApiService} from '../ixlsi-api/ixlsi-api.service';
import {ImportAgent, ImportConfig, ImportConfiguration, ImportDevice, ImportTag} from '../import/import.model';
import {InitService} from '../init/init.service';
import {flatMap, tap} from 'rxjs/operators';
import {LsiCsvParser} from '../../common/util/lsi-csv-parser';
import {getWDCTableSchema} from './wdc-util';
import {AgentService} from '../agent/agent.service';
import {CONNECTION_NAME} from '../../common/constants';
import TableInfo = tableau.TableInfo;
import Table = tableau.Table;

/**
 * Service for the callbacks from tableau
 */
@Injectable({
  providedIn: 'root'
})
export class WdcService {

  /**
   * Current data, mapped by table id
   */
  public data = new Map<string, any>();

  /**
   * All current schemas
   */
  public schemas: TableInfo[] = [];

  private TAG = this.constructor.name;

  /**
   * Subject for phase tagChange
   */
  public phaseSubject: Subject<string> = new Subject();

  /**
   * WDC Connector
   */
  private connector: any;

  constructor(
    private readonly authService: AuthService,
    private readonly ixLsiApiService: IXLsiApiService,
    private readonly initService: InitService,
    private readonly agentService: AgentService,
  ) {
  }

  /**
   * Saves the importConfiguration data to tableau connectiondata and starts gatherData phase
   * @parma importConfiguration - The comfiguration to use when importing
   */
  static startDataImport(importConfiguration: ImportConfiguration) {
    const importAgents = [];
    for (const agentId in importConfiguration.agents) {
      const importAgent = new ImportAgent(agentId, []);
      for (const deviceId in importConfiguration.agents[agentId]) {
        const importDevice = new ImportDevice(deviceId, []);
        for (const tagId in importConfiguration.agents[agentId][deviceId]) {
          const currTag: any = importConfiguration.agents[agentId][deviceId][tagId];
          if (currTag !== undefined) {
            const limit = currTag.limit ? +currTag.limit : undefined;
            const postAggr = currTag.postAggr ? currTag.postAggr : undefined;
            const formulaOperator = currTag.formulaOperator ? currTag.formulaOperator : undefined;
            const formulaFactor = currTag.formulaFactor ? currTag.formulaFactor : undefined;
            importDevice.tags.push(new ImportTag(+tagId, limit, postAggr, formulaOperator, +formulaFactor));
          }
        }
        if (importDevice.tags.length > 0) {
          importAgent.devices.push(importDevice);
        }
      }
      if (importAgent.devices.length > 0) {
        importAgents.push(importAgent);
      }
    }

    const importConfig = new ImportConfig(
      importConfiguration.selectedCompany,
      importAgents,
      importConfiguration.startingDate,
      importConfiguration.endingDate,
    );

    tableau.connectionData = JSON.stringify(importConfig);
    tableau.submit();
  }

  /**
   * Initializes WDC Connector
   */
  registerWebDataConnector() {
    this.connector = tableau.makeConnector();
    this.connector.init = (initCallback) => {
      this.connectorInit(); // Initialize connector
      this.initService.initializeApp().subscribe(() => {
        this.onAppInitialized(initCallback); // Initialize app
      });
    };

    this.connector.getSchema = (schemaCallback) => {
      const schemas = this.getSchemas();
      schemaCallback(schemas);
    };

    this.connector.getData = (table, doneCallback) => {
      const data = this.getData(table);
      table.appendRows(data);
      doneCallback();
    };

    tableau.registerConnector(this.connector);
    Log.d(this.TAG, 'Registered connector');
  }

  private onAppInitialized(initCallback) {
    if (tableau.phase === tableau.phaseEnum.gatherDataPhase) {
      const config = this.loadConfig();
      this.authService.createAuthorizationToken(config)
        .pipe(
          flatMap(() => this.ixLsiApiService.discoverApiEndpoints(config.companyId)),
          flatMap(() => this.fetchData(config)),
        ).subscribe(null, null, () => initCallback());
      return;
    }
    initCallback();
  }

  /**
   * Callback from tableau for WDC initialization
   */
  connectorInit() {
    tableau.authType = tableau.authTypeEnum.custom;
    tableau.connectionName = CONNECTION_NAME;
    this.phaseSubject.next(tableau.phase);
    Log.d(this.TAG, 'PHASE: ' + tableau.phase);
  }

  /**
   * Loads the config from tableau connection data
   */
  loadConfig(): ImportConfig {
    Log.d(this.TAG, 'Loading config...');
    tableau.reportProgress('Loading data...');
    return JSON.parse(tableau.connectionData);
  }

  /**
   * Loads the config from localstorage and fetches data
   * @param config = Config to fetch data for
   */
  fetchData(config: ImportConfig) {
    Log.d(this.TAG, 'Fetching data...');
    return forkJoin(
      ...config.agents.map(configAgent => this.fetchDataForAgent(config.companyId, configAgent, config.startDate, config.endDate))
    );
  }


  private fetchDataForAgent(companyId: string, configAgent: ImportAgent, startDate: string, endDate: string): Observable<string> {
    return this.ixLsiApiService.getTagData(
      configAgent, startDate, endDate
    ).pipe(
      tap(csv => this.onAgentDataFetched(csv, companyId, configAgent))
    );
  }

  /**
   * Called when done fetching data for agent
   * @param csv - CSV returned by data export
   * @param companyId - Company id of export
   * @param configAgent - Agent data has been fetched of
   */
  private onAgentDataFetched(csv: string, companyId: string, configAgent: ImportAgent) {
    Log.d(this.TAG, 'Parsing CSV...');
    tableau.reportProgress('Parsing CSV...');
    const agent = this.agentService.agents.get(companyId).find(currAgent => currAgent.publicId === configAgent.agentId);
    const parser = new LsiCsvParser(csv, agent);
    const tableId = `ixonwdc_${agent.publicId}`;
    this.schemas.push(getWDCTableSchema(tableId, agent.name, parser.columnInfo));
    this.data.set(tableId, parser.wdcData);
  }

  /**
   * Function called by tableau to get the schema for the data
   */
  private getSchemas() {
    Log.d(this.TAG, 'Getting Schema.');
    return this.schemas;
  }

  /**
   * Function called by tableau to get the data
   */
  private getData(table: Table) {
    Log.d(this.TAG, 'Getting Data.');
    return this.data.get(table.tableInfo.id);
  }
}
