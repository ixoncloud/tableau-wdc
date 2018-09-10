export const environment = {
  /**
   * Wether app is running in production or not
   */
  production: false,

  /**
   * Api discovery url
   */
  ixApiDiscoveryUrl: 'https://api.ixon.net',

  /**
   * Amount of retries for api discovery
   */
  ixApiDiscoveryRetry: 5,

  /**
   * API version for IxApi
   */
  ixApiVersion: 1,

  /**
   * Expiry for accesstoken of Ix API
   */
  ixApiExpire: 3600,
  /**
   * Application id
   */
  apiApplicationId: '',
  /**
   * Expiry for authorizationtoken of IxLsi API
   */
  lsiApiExpire: 3600,
};
