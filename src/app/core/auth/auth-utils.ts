import {LoginDetails} from './login-page/login/logindetails';
import {Base64} from 'js-base64';

/**
 * Creates base64 encoded authentication string
 * @param details - Logindetails to be used when creating the string
 */
export function createBasicAuthString(details: LoginDetails): string {
  return Base64.encode(details.email + ':' + (details.otp ? details.otp : '') + ':' + details.password);
}
