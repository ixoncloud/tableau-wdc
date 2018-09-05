import {inject} from '@angular/core/testing';
import {LoginDetails} from './login-page/login/logindetails';
import {createBasicAuthString} from './auth-utils';

describe('AuthUtils', function () {
  it('should generate valid authentication string', inject([], () => {
    const authString = createBasicAuthString(new LoginDetails('john.doe@gmail.com', '000000', 'hunter2'));
    expect(authString).toEqual('am9obi5kb2VAZ21haWwuY29tOmh1bnRlcjI6MDAwMDAw');
  }));
});
