/**
 * Stores login details
 */
export class LoginDetails {
  constructor(
    /**
     * Email of user
     */
    public email: string = '',
    /**
     * Password of user
     */
    public password: string = '',
    /**
     * OTP token of user
     */
    public otp: string = ''
  ) {}
}
