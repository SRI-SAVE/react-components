import 'whatwg-fetch';

let httpResponse = { status: 200, headers: { 'Content-type': 'application/json' }};
let saveFetch = window.fetch;
let restore;
let githubFetch = () => {
  let fakeData = JSON.stringify([
    {
      name: 'Shooting Range',
      ID: 'myRange',
    }, {
      name: 'M4 Carbine',
      ID: 'myM4',
    },
  ]);
  let jsonData = '{ "tooltray": ' + fakeData + ' }';

  return Promise.resolve(new window.Response(jsonData, httpResponse));
};

export const fakeFetch = () => {
  if (restore !== undefined) {
    return;
  } else {
    restore = () => {
      window.fetch = saveFetch;
    };
  }

  window.fetch = (path) => {
    switch (path) {
      case 'http://localhost:3001/CAT/inventory':
        return githubFetch();
      default:
        return Promise.reject(new Error('fakeFetch has no handler for: ' + path));
    }
  };

  window.fetch.restore = restore;
};

export const restoreFetch = () => {
  if (restore !== 'undefined') {
    restore();
  }
};

export default fakeFetch;

fakeFetch();
// fetch('/foo').catch((e) => { console.log(e.message); });
