/**
 * @file apiConfig.js
 * Defines api call configuration settings
 */

import { appConfig } from './appConfig';

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

      /* ======  BASKET  ====== */
      baskets: {
        path: '/baskets',
        API: 'shop',
        calls: {
          create: {
            path: '',
            pathParams: [],
            requiredParams: [],
            requiredData: [],
            callType: 'GET',
            headers: {
              'Content-Type': 'application-json'
            }
          }
        }
      },

      products: {
        path: '/products',
        API: 'shop',
        calls: {
          get: {
            path: '/{0}',
            pathParams: [{ name: 'productID', index: 0 }],
            requiredParams: [],
            requiredData: [],
            callType: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          images: {
            path: '/{0}/images',
            pathParams: [{ name: 'productID', index: 0 }],
            requiredParams: ['all_images'],
            requiredData: [],
            callType: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        }
      },
      categories: {
        path: '/categories',
        API: 'shop',
        calls: {
          get: {
            path: '/{0}',
            pathParams: [{ name: 'categoryID', index: 0 }],
            requiredParams: ['levels'],
            requiredData: [],
            callType: 'GET',
            headers: {
              'Content-Type': 'application/json'
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
      development: 'https://dw-web-example.demandware.net/s/' + appConfig.siteID + '/dw/',
      qa: 'https://qa-web-example.demandware.net/s/' + appConfig.siteID + '/dw/',
      staging: 'https://staging-web-example.demandware.net/s' + appConfig.siteID + '/dw/',
      production: 'https://www.example.com/dw/'
    },
    clientIDs: {
      development: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      production: '',
      staging: '',
      qa: ''
    },
    currentVersion: 'v17_8',
  }
};