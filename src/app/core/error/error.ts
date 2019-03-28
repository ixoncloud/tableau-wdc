import {environment} from '../../../environments/environment';

export class AppError {
  public message: string;

  constructor(message) {
    this.message = message;
  }
}

export const AppErrors = {
  NO_ERROR: new AppError('An unkown error occurred.'),
  API_ERROR: new AppError('Could not connect to the IXPlatform.'),
  NOT_IN_TABLEAU: new AppError(`It seems like ${environment.brandingName} Tableau-WDC was not loaded inside Tableau. To use ${environment.brandingName} Tableau-WDC, please load it inside the Tableau browser.`)
};
