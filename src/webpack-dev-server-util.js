
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

const installFakeSandbox = () => {
  window._dSAVE = _dSAVE;
}

installFakeSandbox();
