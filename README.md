# IXON Tableau-WDC
[![CircleCI](https://circleci.com/gh/ixoncloud/tableau-wdc.svg?style=svg)](https://circleci.com/gh/ixoncloud/tableau-wdc)

Tableau-WDC is a Web Data Connector webapp for Tableau, which uses the IXlsi API to fetch data from the IXPlatform and exports it to Tableau.

## Official instance

In case you are not looking into hosting Tableau-WDC yourself, IXON is hosting the latest version of the webapp [here](https://cdn.ixon.cloud/tableau/latest/).

## Getting Started

### Prerequisites

In order to develop, test & build Tableau-WDC you'll need the following installed:

* Nodejs 8.9+

You will also need an IXON Application ID in order to be able to let the webapp communicate with the IXPlatform.

### Development
* Run `npm install` or `yarn` to install all dependencies.

* Setup your development environment file:
  * Rename the [development environment example file](https://github.com/ixoncloud/tableau-wdc/tree/master/src/environments/environment.example.ts) to `environment.ts`
  * Open the file and add your IXON application ID between the quotes (e.g. `apiApplicationId: 'AAAAAAAAA'`)
  
* Run `npm run start` or `yarn start` to start the angular-cli development server.

### Production
* Run `npm install --production` or `yarn --production` to install all dependencies.

* Setup your production environment file:
  * Rename the [production environment example file](https://github.com/ixoncloud/tableau-wdc/tree/master/src/environments/environment.prod.example.ts) to `environment.prod.ts`
  * Open the file and add your IXON application ID between the quotes (e.g. `apiApplicationId: 'AAAAAAAAA'`)
* Run `npm run build:prod` or `yarn build:prod` to build the webapp for production.
  * In case you are hosting the site in a subdirectory (Not on `/`), please use `npm run build:prod --base-href <path>` or `yarn build:prod --base-href <path>`
* You will find the final html, css & javascript files in `dist/`

### Unit-tests
Run `npm run test` or `yarn test` to run the unit-tests with Karma & Headless Chrome (**Google Chrome has to be installed**).

### Code Documentation

Run `npm run docs` or `yarn docs` to generate the compodocs documentation based on JSDoc comments in the code.

---

## Frequently Asked Questions

<details>
<summary>The page is blank when I load the site in my webbrowser, why is it not working?</summary>
<br>
Tableau-WDC is built to run in the browser built-in to Tableau.
Because the webapp expects to be loaded in that exact browser, it will not do anything when loaded via a normal browser.
</details>

---
## Constraints 

Because Tableau-WDC has to run in the browser built into Tableau, which is based on an old version of WebKit, some stuff in the webapp has been made differently than in any other Angular project.

For instance, instead of using the Angular Material components, Tableau-WDC uses [angular2-mdl](http://mseemann.io/angular2-mdl/) for it's UI-elements and style.

Also this webapp enables a lot of polyfills to make modern JavaScript API's available in the old version of WebKit.

---
## Web Data Connector

To import data from the web, Tableau has a feature called `Web Data Connectors`. These `WDCs` are websites which include a special javascript library, allowing javascript on the site to communicate with the Tableau builtin browser.

The communication between the site and Tableau is divided into two phases:

### Interactive Phase

The Tableau builtin browser is visible and Tableau-WDC shows the login screen. Once logged in, Tableau-WDC shows a configuration tool which can be used to choose which Agents and Tags have to be exported from the IxPlatform. This page also allows further configuration of for instance the limit and post aggregator. After configuration is done, the user can start the importing process, closing the window and starting the second phase:

### Gather Data phase

In the Gather Data phase, Tableau will open Tableau-WDC in the background to fetch the data. Tableau-WDC will detect that it's running in the second phase and used the saved credentials & settings from the Interactive Phase to fetch the requested data from the IxLsi API. Once this is done the webapp will parse the data and hand it over to Tableau.

---

## License

IXON Tableau-WDC is licensed under the [MIT License](https://github.com/ixoncloud/tableau-wdc/blob/master/LICENSE).

