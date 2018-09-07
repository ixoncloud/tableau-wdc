# Ixonwdc
[![CircleCI](https://circleci.com/gh/ixoncloud/tableau-wdc.svg?style=svg)](https://circleci.com/gh/ixoncloud/tableau-wdc)

IxonWDC is a Web Data Connector webapp for Tableau, which uses the IXlsi API to fetch data from the IXPlatform and exports it to Tableau.

## Getting Started

### Prerequisites

In order to develop, test & build IxonWDC you'll need the following installed:

* Nodejs 8.9+

### Development
* Run `npm install` or `yarn` to install all dependencies.
* Run `npm run serve` or `yarn serve` to start the angular-cli development server.

### Unit-tests
Run `npm run test` or `yarn test` to run the unit-tests with Karma & Headless Chrome (**Google Chrome has to be installed**).

### Environments

Before building the app for testing or production, you'll need to enter your IXON `Application ID` in the correct environment file.
You can find the folder with environment files [here](https://github.com/ixoncloud/tableau-wdc/tree/master/src/environments).

### Building

Run `npm run build` or `yarn build` to build the app.

### Code Documentation

Run `npm run docs` or `yarn docs` to generate the compodocs documentation based on JSDoc comments in the code.

----
## Web Data Connector

To import data from the web, Tableau has a feature called `Web Data Connectors`. These `WDCs` are websites which include a special javascript library, allowing javascript on the site to communicate with the Tableau builtin browser.

The communication between the site and Tableau is divided into two phases:

### Interactive Phase

The Tableau builtin browser is visible and IxonWDC shows the login screen. Once logged in, IxonWDC shows a configuration tool which can be used to choose which Agents and Tags have to be exported from the IxPlatform. This page also allows further configuration of for instance the limit and post aggregator. After configuration is done, the user can start the importing process, closing the window and starting the second phase:

### Gather Data phase

In the Gather Data phase, Tableau will open IxonWDC in the background to fetch the data. IxonWDC will detect that it's running in the second phase and used the saved credentials & settings from the Interactive Phase to fetch the requested data from the IxLsi API. Once this is done the app will parse the data and hand it over to Tableau.

---

## License

IXON WDC is licensed under the [MIT License](https://github.com/ixoncloud/tableau-wdc/blob/master/LICENSE).

