/*
Copyright 2016 SRI International

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*global __WEBPACK_DEV_SERVER_DEBUG__*/
/*global __WEBPACK_DEV_SERVER_NO_FF__*/

let SAVE;
let hostn = window.location.hostname;

if (__WEBPACK_DEV_SERVER_DEBUG__) { // for webpack-dev-server auto simulate
  SAVE = require('./webpack-dev-server-util');

  if (!__WEBPACK_DEV_SERVER_NO_FF__) require('./webpack-dev-server-fetch');
} else if (hostn === 'sri-save.github.io' || hostn === '') {
  // for gh-pages and file:/// uri's ('') we want the simulated (stubbed) sandbox
  SAVE = require('./webpack-dev-server-util');
}

window.SAVE2 = {
  VERSION: '2.0.1',
  lib: { view: SAVE },
  isCAT: () => window._EntityLibrary != null || hostn === 'sri-save.github.io' || hostn === '', // '' => file:/// uri's
  simulate: () => {
    // window.SAVE2.lib.view = require('./webpack-dev-server-util');
    require('./webpack-dev-server-fetch');
  },
};
