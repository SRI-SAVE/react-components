/*global __WEBPACK_DEV_SERVER_DEBUG__*/
/*global __WEBPACK_DEV_SERVER_NO_FF__*/

let SAVE;

if (__WEBPACK_DEV_SERVER_DEBUG__) { // for webpack-dev-server auto simulate
  SAVE = require('./webpack-dev-server-util');
  
  if (!__WEBPACK_DEV_SERVER_NO_FF__) require('./webpack-dev-server-fetch');
}

window.SAVE2 = {
  VERSION: '2.0.1',
  lib: { view: SAVE },
  isCAT: () => window._EntityLibrary != null || window.location.hostname === 'save.github.io',
  simulate: () => {
    window.SAVE2.lib.view = require('./webpack-dev-server-util');
    require('./webpack-dev-server-fetch');
  },
};
