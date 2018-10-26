import {ApiResponse, Link} from '../../core/ix-api/ix-api-responses';
import {concat, delay, mergeMap, retryWhen, take} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {AgentImportConfiguration} from '../../core/import/import-config.model';

/**
 * Creates quick lookup object from discovery endpoint response
 * @param data - Discovery endpoint response
 */
export function createEndpointObject(data: ApiResponse<void>) {
  const apiEndpointsObject = {};
  data.links.forEach((endpoint: Link) => {
    apiEndpointsObject[endpoint.rel] = endpoint.href;
  });
  return apiEndpointsObject;
}

/**
 * RXJS operator that retries 5 times and else throws a networkerror
 */
export function retryHttpRequest() {
  return retryWhen(errors =>
    errors.pipe(
      mergeMap(error => error.status === 0 ? of(error) : throwError(error)),
      delay(1000),
      take(environment.ixApiDiscoveryRetry - 1),
      concat(
        throwError(new HttpErrorResponse({status: 0, statusText: 'NetworkError'}))
      ) // Executes when everything is finished, cannot access last error
    )
  );
}

/**
 * Generates an IxLsi request body based on an agent given
 * @param agent - agent to generate request body for
 */
export function generateIxLsiRequestBody(agent: AgentImportConfiguration): any {
  const body = {};
  for (const device of agent.devices) {
    body[device.deviceId] = {};
    for (const tag of device.tags) {
      body[device.deviceId][tag.tagId] = {
        raw: [{
          ref: `${device.deviceId}_${tag.tagId}`,
          operator: tag.formulaOperator,
          factor: tag.formulaFactor,
          limit: tag.limit,
          postAggr: tag.postAggr,
        }]
      };
    }
  }
  return body;
}
