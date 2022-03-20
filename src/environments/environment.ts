// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./interface";

export const environment = {

  production: false,
  firebase: {
    projectId: 'steam-app-45b82',
    appId: '1:442230193237:web:ace1e72096930f375428dc',
    databaseURL: 'https://steam-app-45b82-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'steam-app-45b82.appspot.com',
    apiKey: 'AIzaSyCnNWAEeiPHJOOtIiZexHoSGasz-4fSChE',
    authDomain: 'steam-app-45b82.firebaseapp.com',
    messagingSenderId: '442230193237',
  },
  apiKey:'AIzaSyCnNWAEeiPHJOOtIiZexHoSGasz-4fSChE',
  Datebase: 'https://steam-app-45b82-default-rtdb.europe-west1.firebasedatabase.app/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
