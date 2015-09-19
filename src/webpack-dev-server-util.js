
const installSandboxMocks = () => {
  // window.GUID = GUID;
  window._dSAVE = _dSAVE;
  // window.vwf = vwf;
}

// export const GUID = () => '123456789abcde';

export const _dSAVE = {
    createS3D() {
      console.log(arguments);
    },
};

// export const vwf = {
//   getProperty() {
//   },
// }

installSandboxMocks();
