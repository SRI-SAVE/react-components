/*global __WEBPACK_DEV_SERVER_DEBUG__*/
/*global __WEBPACK_DEV_SERVER_NO_FF__*/

let SAVE;
let hostn = window.location.hostname;

if (__WEBPACK_DEV_SERVER_DEBUG__) { // for webpack-dev-server auto simulate
  SAVE = require('./webpack-dev-server-util');

  if (!__WEBPACK_DEV_SERVER_NO_FF__) require('./webpack-dev-server-fetch');
}

window.SAVE2 = {
  VERSION: '2.0.1',
  lib: { view: SAVE },
  isCAT: () => window._EntityLibrary != null || hostn === 'sri-save.github.io' || hostn === '',
  simulate: () => {
    window.SAVE2.lib.view = require('./webpack-dev-server-util');
    require('./webpack-dev-server-fetch');
  },
};
