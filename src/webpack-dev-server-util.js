/*global __WEBPACK_SAVE_MODE__*/
if (__WEBPACK_SAVE_MODE__ === 'CAT') window._EntityLibrary = { };

export default  {
  createSemanticAsset() {
    console.group('SAVE2.lib.view.createSemanticAsset()');
      console.table([ arguments ]);
    console.groupEnd();
  },

  loadStaticAutoAssets(list) {
    console.group('SAVE2.lib.view.loadStaticAutoAssets()');
      list.forEach(auto => { console.dir(auto); });
    console.groupEnd();
  },

  setBaseServerAddress(baseServerAddress) {
    console.group('SAVE2.lib.view.setBaseServerAddress()');
      console.dir(baseServerAddress);
    console.groupEnd();
  },
};
