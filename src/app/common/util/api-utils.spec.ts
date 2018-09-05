import {inject} from '@angular/core/testing';
import {ApiResponse} from '../../core/ix-api/ix-api-responses';
import {createEndpointObject, generateIxLsiRequestBody} from './api-utils';
import {ImportAgent, ImportDevice, ImportTag} from '../../core/import/import.model';

describe('ApiUtils', function () {
  it('should create api endpoint object from the discovery response given', inject([], () => {
    const discoveryResponse = <ApiResponse<void>>{
      links: [
        {
          rel: 'Mom',
          href: 'https://mom.com'
        },
        {
          rel: 'Aunt',
          href: 'https://aunt.cloud'
        }
      ]
    };

    const discoveryArray = createEndpointObject(discoveryResponse);

    discoveryResponse.links.forEach(link => {
      expect(discoveryArray[link.rel]).toEqual(link.href);
    });
  }));

  it('should generate a valid IxLsi request body', inject([], () => {
    const agent = new ImportAgent('agent1', [
      new ImportDevice('device1', [
        new ImportTag(1, 10, 'mean'),
        new ImportTag(2, 69, 'something', '*', 0)
      ]),
      new ImportDevice('device2', [
        new ImportTag(1, 100, 'max'),
        new ImportTag(2, 34324, 'min')
      ])
    ]);

    const bodyRef = {
      device1: {
        1: {
          raw: [
            {
              limit: 10,
              ref: 'device1_1',
              postAggr: 'mean',
              operator: undefined,
              factor: undefined,
            }
          ]
        },
        2: {
          raw: [
            {
              limit: 69,
              ref: 'device1_2',
              postAggr: 'something',
              operator: '*',
              factor: 0,
            }
          ]
        }
      },
      device2: {
        1: {
          raw: [
            {
              limit: 100,
              ref: 'device2_1',
              postAggr: 'max',
              operator: undefined,
              factor: undefined,
            }
          ]
        },
        2: {
          raw: [
            {
              limit: 34324,
              ref: 'device2_2',
              postAggr: 'min',
              operator: undefined,
              factor: undefined,
            }
          ]
        }
      }
    };
    const body = generateIxLsiRequestBody(agent);

    expect(body).toEqual(bodyRef);
  }));
});
