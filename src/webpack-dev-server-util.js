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

  reset() {
    console.group('SAVE2.lib.view.reset()');
    console.groupEnd();
  },

  setBaseServerAddress(baseServerAddress) {
    console.group('SAVE2.lib.view.setBaseServerAddress()');
      console.dir(baseServerAddress);
    console.groupEnd();
  },
};
