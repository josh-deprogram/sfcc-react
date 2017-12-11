/**
 * appConfig.js
 * Defines application configuration settings and provides helper functions for
 * easily getting the needed information.
 */

/****************************************************
 // Environment specific app settings.
 *****************************************************/
export const appConfig = {
  /**
   * Operation Mode
   * This value is meant to control certain settings that are set differently
   * for development purposes than they need to be for production purposes.
   * Options.
   */
  // instanceType: 'production',
  // instanceType: 'staging',
  // instanceType: 'qa',
  instanceType: 'development',

  // Definces the settings for each instance type.
  environment: {

    // Setup for app development.
    development: {

    },

    // Setup for a production release.
    production: {

    }
  },

/****************************************************
// Settings for UI settings.
*****************************************************/

  // Configuration settings for the navbar menu in the expanded state.
  sidebar: {

    // Defines the proportion of the screen that will not be covered by the sidebar menu.
    marginRight: .3,

    // Define the time (in ms) that it takes to toggle the sidebar menu.
    toggleTime: 300
  },

  siteID: 'HOKA-US'
};

/****************************************************
// Settings for any API data calls made from the app.
*****************************************************/
export const apiConfig = {
  OCAPI: {
    // Set each type of environment to 'mock' or 'live' to use a live API call
    // or mock data.
    environment: {
      // development: 'mock',
      development: 'live',
      qa: 'live',
      staging: 'live',
      production: 'live'
    },

    // Define each possible call type that available.
    resources: {
      Baskets: {
        path: '/baskets',
        API: 'shop',
        calls: {
          create: {
            path: '',
            requiredParams: [],
            requiredData: [],
            callType: 'GET',
            headers: {
              'Content-Type': 'application-json'
            }
          }
        }
      }
    },
    API: {
      shop: {
        path: '/shop',
      },
      data: {
        path: '/data',
      }
    },
    // The base URI of the API call endpoint that will be used if the selected environment type
    // is setup to use the live API.
    baseEndpoints: {
      develpment: 'https://dw25-web-deckers.demandware.net/s/' + appConfig.siteID,
      qa: 'https://dw24-web-deckers.demandware.net/s/' + appConfig.siteID,
      staging: 'https://staging-web-deckers.demandware.net/s/' + appConfig.siteID,
      production: 'https://www.hokaoneone.com/dw/'
    },
    clientIDs: {
      development: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      production: '',
      staging: '',
      qa: ''
    },
    currentVersion: 'v17_8',
  },

};