import {Injectable} from '@angular/core';
import {ApiResponse} from '../ix-api/ix-api-responses';
import {map, tap} from 'rxjs/operators';
import {Log} from '../../common/util/logger';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IXApiService} from '../ix-api/ix-api.service';
import {Company} from './company.model';

/**
 * Service for retrieving companies
 */
@Injectable()
export class CompanyService {

  /**
   * Tag for logging
   */
  private TAG = this.constructor.name;

  /**
   * Subject for when the list of agentsOfSelectedCompany updates
   */
  public companySubject = new BehaviorSubject([]);

  constructor(
    private readonly http: HttpClient,
    private readonly ixApiService: IXApiService,
  ) {
  }

  /**
   * Fetches all companies accessable by user
   */
  loadCompanies(): Observable<Company[]> {
    Log.d(this.TAG, 'Fetching companies...');
    return this.http.get<ApiResponse<Company[]>>(`${this.ixApiService.apiEndpoints['CompanyList']}`)
      .pipe(
        map((res: ApiResponse<Company[]>) => res.data),
        tap((companies: Company[]) => this.onCompaniesFetched(companies))
      );
  }

  /**
   * Called when companies have been retrieved
   * @param copanies - Companies fetched from api
   */
  private onCompaniesFetched(copanies: Company[]) {
    Log.d(this.TAG, 'Fetched companies.');
    this.companySubject.next(copanies);
  }
}
