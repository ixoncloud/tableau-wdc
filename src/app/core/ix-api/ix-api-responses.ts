/**
 * Link for api endpoint
 * @ignore
 */
export class Link {
  constructor(
    public href: string,
    public rel: string
  ) {
  }
}

/**
 * Generic response from IX and IXlsi API
 * @ignore
 */
export interface ApiResponse<T> {
  count?: number;
  data?: T;
  status?: 'sucess' | 'error';
  links?: Link[];
  type?: string;
}

/**
 * Data returned by IX API when creating an access token
 * @ignore
 */
export interface CreateAccesstokenResponse {
  secretId: string;
}

/**
 * Data returned by IX API when creating an authorization token
 * @ignore
 */
export interface CreateAuthorizationTokenResponse {
  token: string;
}

