/**
 * Format used for storing access token + exipire of the IX API
 */
export class AuthStorage {
  constructor(
    /**
     * Accesstoken for IX API
     */
    public accessToken: string,
    /**
     * Expiry date for accesstoken as unix time stamp
     */
    public expire: number
  ) {
  }
}
