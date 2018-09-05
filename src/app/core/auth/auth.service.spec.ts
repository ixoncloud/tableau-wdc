import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthStorage} from './auth-storage';
import * as moment from 'moment';

describe('AuthService', () => {
  beforeEach(() => {
    global['tableau'] = {};
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should load access token from tableau password storage', inject([AuthService], (service: AuthService) => {
    // Create new auth storage object with mock access token and an expirydate of today + 1 year
    const authStorage = new AuthStorage('aaabbbcccdddeeefffggg', moment().add(1, 'y').valueOf());

    // Add access token and expiry to tableau password storage
    tableau.password = JSON.stringify(authStorage);

    service.loadAccessTokenFromPasswordStorage();
    expect(service.accessToken).toEqual(authStorage.accessToken);
  }));

  it('should not load access token from tableau password storage when token has expired', inject([AuthService], (service: AuthService) => {
    // Create new auth storage object with mock access token and an expirydate of today - 1 year
    const authStorage = new AuthStorage('aaabbbcccdddeeefffggg', moment().add(-1, 'y').valueOf());

    // Add access token and expiry to localstorage
    tableau.password = JSON.stringify(authStorage);

    service.loadAccessTokenFromPasswordStorage();
    expect(service.accessToken).toEqual('');
  }));

  it('should add accesstoken to service and Tableau password storage', inject([AuthService], (service: AuthService) => {
    const accessToken = 'aaabbbcccdddeeefffggg';

    service.setAccessToken(accessToken, new Date());

    expect(service.accessToken).toEqual(accessToken);

    const authStorage: AuthStorage = JSON.parse(tableau.password);
    expect(authStorage.accessToken).toEqual(accessToken);
  }));

  it('should remove access token from service and tableau password storage', inject([AuthService], (service: AuthService) => {
    // Create new auth storage object with mock access token and an expirydate of today - 1 year
    const authStorage = new AuthStorage('aaabbbcccdddeeefffggg', moment().add(-1, 'y').valueOf());

    // Add access token and expiry to tableau password storage
    tableau.password = JSON.stringify(authStorage);

    service.removeAccessToken();
    expect(service.accessToken).toEqual('');
    expect(tableau.password).toBeUndefined();
  }));
});
