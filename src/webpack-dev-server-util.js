
export const _dSAVE = {
    createS3D() {
      console.log(arguments);
    },

    installAutoLoads() {
      console.log(arguments);
    },
};

const installFakeSandbox = () => {
  window._dSAVE = _dSAVE;
}

installFakeSandbox();
