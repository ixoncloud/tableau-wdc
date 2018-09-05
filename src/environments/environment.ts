// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  ixApiEspire: 3600,
  /**
   * Application id
   */
  apiApplicationId: '',
  /**
   * Expiry for authorizationtoken of IxLsi API
   */
  lsiApiExpire: 3600,
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
