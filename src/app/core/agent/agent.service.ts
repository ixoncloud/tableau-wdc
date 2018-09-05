import {Injectable} from '@angular/core';
import {ApiResponse} from '../ix-api/ix-api-responses';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IXApiService} from '../ix-api/ix-api.service';
import {Log} from '../../common/util/logger';
import {flattenArray} from '../../common/util/util';
import {Agent} from './agent.model';
import {Company} from '../company/company.model';

/**
 * Service for the retrieval of agents
 */
@Injectable()
export class AgentService {

  /**
   * Logging tag
   */
  private TAG = this.constructor.name;

  /**
   * All agents known to the website, catagorized by company id
   */
  public agents = new Map<string, Agent[]>();

  /**
   * Subject for when the list of agents updates
   */
  public agentsSubject = new BehaviorSubject<Map<string, Agent[]>>(new Map());

  constructor(
    private readonly http: HttpClient,
    private readonly ixApiService: IXApiService) {
  }

  /**
   * Fetches all agents of a company and adds it to the agents map
   * @param company - The company to fetch agents for
   */
  private fetchAgentsOfCompany(company): Observable<Agent[]> {
    Log.d(this.TAG, `Fetching agents for Company "${company.name}".`);
    return this.http.get<ApiResponse<Agent[]>>(`${this.ixApiService.apiEndpoints['AgentList']}`,
      {
        params: {
          fields: 'name, lsiServer.entryPoint, publicId, devices.publicId, devices.name, devices.tags.*'
        },
        headers: {
          'IXapi-Company': company.publicId
        }
      })
      .pipe(
        map((res: ApiResponse<Agent[]>) => res.data),
        tap((agents: Agent[]) => {
          // Add agents to their company map entry
          this.agents.set(company.publicId, agents);
          Log.d(this.TAG, `Fetched agents for Company "${company.name}".`);
        })
      );
  }


  /**
   * Makes a network request to load all agents
   * @param companies - Companies to load agents for
   */
  loadAgents(companies: Company[]): Observable<Agent[]> {
    // Wait until they all complete and send an array with results
    return forkJoin(
      // Create array of request observables from the companies
      ...companies.map(
        company => this.fetchAgentsOfCompany(company))
    )
      .pipe(
        map((agents: Agent[][]) => flattenArray(agents)),
        tap(() => {
          Log.d(this.TAG, 'Done fetching companies.');
          this.agentsSubject.next(this.agents);
        })
      );
  }
}
