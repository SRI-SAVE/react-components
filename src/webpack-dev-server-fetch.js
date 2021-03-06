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

// fetch('/foo').catch((e) => { console.log(e.message); });

import 'whatwg-fetch';
import M4Grouping from './webpack-dev-server-m4s3d-meta';
import RangeGrouping from './webpack-dev-server-ranges3d-meta';

let restore;
let instructorMode = true;

const routeHandler = (route, options) => {
  switch (route) {
  case 'http://localhost:3001/CAT/inventory':
    return delayResponse(500, inventoryCATFetch());
  // case 'http://localhost:3001/inventory':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/inventory':
    return delayResponse(1500, inventoryEUIFetch());
  // case 'http://localhost:3001/query':
  case 'http://localhost:3001/CAT/query':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/query':
    return queryFetch(options);
  // case 'http://localhost:3001/object':
  case 'http://localhost:3001/CAT/object':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/object':
    return objectFetch(options);
  // case 'http://localhost:3001/action':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/action':
    return actionFetch(options);
  // case 'http://localhost:3001/generateSolution':
  case 'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear/generateSolution':
    return generateSolutionEUIFetch();
  case 'http://localhost:3001/CAT/finishExercise':
    return finishExercise(options);
  case 'http://localhost:3001/listfiles/exercise/json':
    return delayResponse(1000, exerciseFetch());
  default:
    return Promise.reject(new Error('fakeFetch has no handler for: ' + route));
  }
};

const saveFetch = window.fetch;
const httpResponse = { status: 200, headers: { 'Content-type': 'application/json' }};

const delayResponse = (delay, response) => {
  const executor = (resolve /*, reject */) => setTimeout(() => resolve(response), delay);

  return new Promise(executor);
};

const exerciseFetch = () => {
  const exercises = [
    'http://localhost:3001/PutExercise',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_clear',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear_exer_ese',
  ];

  return new window.Response(JSON.stringify(exercises), httpResponse);
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

  return new window.Response(`{ "tooltray": ${ fakeData } }`, httpResponse);
};

const inventoryEUIFetch = () => {
  const fakeData = JSON.stringify([{
      name: 'M4 Carbine',
      ID: 'myM4',
    },
  ]);
  const jsonData = `{ "instructorMode": ${ instructorMode }, "tooltray": ${ fakeData } }`;

  return new window.Response(jsonData, httpResponse);
};

const generateSolutionEUIFetch = () => {
  instructorMode = false;
  return Promise.resolve(new window.Response(null, httpResponse));
};

const actionFetch = options => {
  const body = options.body;
  const o = JSON.parse(body.replace('activity=', ''));

  console.group('actionFetch()');
    console.table([ [ o.arguments ], [ o.names ] ]);
  console.groupEnd();
  return Promise.resolve(new window.Response(null, httpResponse));
};

const queryFetch = options => {
  const body = options.body;
  const o = JSON.parse(body.replace('query=', ''));
  let jsonData;

  console.group('queryFetch()');
    console.table([ [ 'type', o.type ], [ o.query? o.query[ 0 ] : undefined ] ]);
  console.groupEnd();

  switch (o.type) {
  case 'Reset':
    return Promise.resolve(new window.Response(null, httpResponse));
  case 'KbId':
    jsonData = [ o.query[ 0 ] + Date.now() ];
    return Promise.resolve(new window.Response(JSON.stringify({ KbIds: jsonData }), httpResponse));
  }
};

const objectFetch = options => {
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
      case 'myRange':
        jsonData = JSON.stringify([ RangeGrouping ]);
        break;
      default:
        return Promise.reject(new Error('Tool tray ID not handled for object create: ' + o.ID));
      }
    }
  }

  return Promise.resolve(new window.Response(jsonData, httpResponse));
};

const finishExercise = options => {
  const body = options.body;
  const o = JSON.parse(body.replace('save=', ''));

  console.log(o);
  return Promise.resolve(new window.Response(null, httpResponse));
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
