/*global __WEBPACK_DEV_SERVER_DEBUG__*/
if (__WEBPACK_DEV_SERVER_DEBUG__) {
  require('./webpack-dev-server-util');
  require('./webpack-dev-server-fetch');
}

window.SAVE2 = {
  VERSION: '2.0.1',
  vwf: { view: window._dSAVE },
  isCAT: () => window._EntityLibrary != null,
};
