import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {ApiResponse} from '../ix-api/ix-api-responses';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {createEndpointObject, generateIxLsiRequestBody, retryHttpRequest} from '../../common/util/api-utils';
import {Log} from '../../common/util/logger';
import {AgentService} from '../agent/agent.service';
import {ImportAgent} from '../import/import.model';

/**
 * Service for discovery of the IxLsi API
 */
@Injectable({
  providedIn: 'root'
})
export class IXLsiApiService {

  /**
   * Logger tag
   */
  private TAG = this.constructor.name;

  /**
   * Api endpoints for the IxLsi API
   */
  public apiEndpoints = {};

  constructor(
    private readonly http: HttpClient,
    private readonly agentService: AgentService,
  ) {
  }

  /**
   * Fetches IxLsi API Discovery for every agent of a company
   * @param companyId - Company id to fetch IxLsi api discovery for
   */
  discoverApiEndpoints(companyId: string): Observable<ApiResponse<void>> {
    // Merge requests
    return forkJoin(
      ...this.agentService.agents.get(companyId).map(
        agent => this.discoverEndpointsForAgent(agent)
      )
    );
  }

  /**
   * Discoers IXLsi API endpoints for a specific agent
   * @param agent - The agent to fetch endpoints for
   */
  private discoverEndpointsForAgent(agent) {
    Log.d(this.TAG, `Fetching IXlsi API endpoints for Agent "${agent.name}".`);
    return this.http.get<ApiResponse<void>>(`${agent.lsiServer.entryPoint}`)
      .pipe(
        // Retry mechanism
        retryHttpRequest(),
        tap((data: ApiResponse<void>) => {
          this.apiEndpoints[agent.publicId] = createEndpointObject(data);
          Log.d(this.TAG, `Fetched IXlsi API endpoints for Agent "${agent.name}".`);
        })
      );
  }

  /**
   * Fetches CSV data for requested tags
   * @param agent - Agent to fetch data for
   * @param fromDate - Start date for data
   * @param toDate - End date for data
   */
  getTagData(agent: ImportAgent, fromDate: string, toDate: string): Observable<string> {
    Log.d(this.TAG, `Fetching data for Agent "${agent.agentId}".`);
    return this.http.post(`${this.apiEndpoints[agent.agentId]['DataExportMultiple']}`,
      generateIxLsiRequestBody(agent),
      {
        headers: {
          Accept: 'text/csv'
        },
        responseType: 'text',
        params: {
          from: fromDate,
          to: toDate,
        }
      })
      .pipe(
        tap(() => {
          Log.d(this.TAG, `Fetched data for Agent "${agent.agentId}".`);
        })
      );
  }
}
