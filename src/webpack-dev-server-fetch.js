
// fetch('/foo').catch((e) => { console.log(e.message); });

import 'whatwg-fetch';
import M4Grouping from './webpack-dev-server-m4s3d-meta';
import RangeGrouping from './webpack-dev-server-ranges3d-meta';

let restore;
let instructorMode = true;

const routeHandler = (route, options) => {
  switch (route) {
  case 'http://localhost:3001/CAT/inventory':
    return inventoryCATFetch();
  case 'http://localhost:3001/inventory':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/inventory':
    return inventoryEUIFetch();
  case 'http://localhost:3001/query':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/query':
    return queryEUIFetch(options);
  case 'http://localhost:3001/object':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/object':
    return objectEUIFetch(options);
  case 'http://localhost:3001/generateSolution':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/generateSolution':
    return generateSolutionEUIFetch();
  case 'http://localhost:3001/listfiles/exercise/json':
    return exerciseFetch();
  default:
    return Promise.reject(new Error('fakeFetch has no handler for: ' + route));
  }
};

const saveFetch = window.fetch;
const httpResponse = { status: 200, headers: { 'Content-type': 'application/json' }};

const exerciseFetch = () => {
  const exercises = [
    'http://localhost:3001/PutExercise',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_clear',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear_exer_ese',
  ];

  return Promise.resolve(new window.Response(JSON.stringify(exercises), httpResponse));
};

const inventoryCATFetch = () => {
  let fakeData = JSON.stringify([{
      name: 'Shooting Range',
      ID: 'myRange',
    }, {
      name: 'M4 Carbine',
      ID: 'myM4',
    },
  ]);

  return Promise.resolve(new window.Response(`{ "tooltray": ${ fakeData } }`, httpResponse));
};

const inventoryEUIFetch = () => {
  const fakeData = JSON.stringify([{
      name: 'M4 Carbine',
      ID: 'myM4',
    },
  ]);
  const jsonData = `{ "instructorMode": ${ instructorMode }, "tooltray": ${ fakeData } }`;

  return Promise.resolve(new window.Response(jsonData, httpResponse));
};

const generateSolutionEUIFetch = () => {
  instructorMode = false;
  return Promise.resolve(new window.Response(null, httpResponse));
};
const queryEUIFetch = options => {
  const body = options.body;
  const o = JSON.parse(body.replace('query=', ''));

  console.log(o);
  instructorMode = true;
  return Promise.resolve(new window.Response(null, httpResponse));
};

const objectEUIFetch = options => {
  const body = options.body;
  const o = JSON.parse(body.replace('object=', ''));
  let jsonData = null;

  if (o.type === 'create') {
    if (o.auto) {
      jsonData = JSON.stringify([ RangeGrouping ]);
    } else {
      switch (o.ID) {
      case 'myM4':
        jsonData = JSON.stringify([ M4Grouping ]);
        break;
      default:
        return Promise.reject(new Error('Tool tray ID not handled for object create: ' + o.ID));
      }
    }
  }

  return Promise.resolve(new window.Response(jsonData, httpResponse));
};

export const fakeFetch = () => {
  if (restore == null) {
    restore = () => {
      window.fetch = saveFetch;
    };
  } else {
    return;
  }

  window.fetch = (path, options) => routeHandler(path, options);
  window.fetch.restore = restore;
};

export const restoreFetch = () => {
  if (restore != null) {
    restore();
  }
};

export default fakeFetch;

fakeFetch();
