/*global __WEBPACK_SAVE_MODE__*/
if (__WEBPACK_SAVE_MODE__ === 'CAT') window._EntityLibrary = { };

export const _dSAVE = {
  createSemanticAsset() {
    console.log(arguments);
  },

  installAutoLoads() {
    console.log(arguments);
  },

  setBaseServerAddress() {
    console.log(arguments);
  },
};

const fakeSandbox = () => {
  window._dSAVE = _dSAVE;
}

fakeSandbox();
