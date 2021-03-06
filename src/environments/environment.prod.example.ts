export const environment = {
  /**
   * Wether app is running in production or not
   */
  production: true,

  /**
   * Api discovery url
   */
  ixApiDiscoveryUrl: 'https://api.ixon.net',

  /**
   * Branding url, used for logo
   */
  brandingDomain: 'connect.ixon.cloud',

  /**
   * Branding name, used in page title
   * e.g: "{name} Web Data Connector"
   */
  brandingName: 'IXON',

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
