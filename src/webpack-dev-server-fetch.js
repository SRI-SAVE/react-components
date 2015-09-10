import 'whatwg-fetch';

let httpResponse = { status: 200, headers: { 'Content-type': 'application/json' }};
let saveFetch = window.fetch;
let restore;
let exerciseFetch = () => {
  let exercises = [
    'http://localhost:3001/PutExercise/exercise',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_clear',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_clear_exer_with_subtasks',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_clear_exer_with_subtasks_v2',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear',
    'http://localhost:3001/exercises/071-100-0032/step01/m4_flora_clear_exer_ese',
  ];
  let jsonData = JSON.stringify(exercises);

  return Promise.resolve(new window.Response(jsonData, httpResponse));
};
let inventoryCATFetch = () => {
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
let inventoryEUIFetch = () => {
  let fakeData = JSON.stringify([
    {
      name: 'M4 Carbine',
      ID: 'myM4',
    },
  ]);
  let jsonData = '{ "instructorMode": true, "tooltray": ' + fakeData + ' }';

  return Promise.resolve(new window.Response(jsonData, httpResponse));
};
let generateSolutionEUIFetch = () => {
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

  window.fetch = path => {
    switch (path) {
      case 'http://localhost:3001/CAT/inventory':
        return inventoryCATFetch();
      case 'None/inventory':
      case '/exercises/071-100-0032/step01/m4_flora_clear/inventory':
        return inventoryEUIFetch();
      case 'None/generateSolution':
      case '/exercises/071-100-0032/step01/m4_flora_clear/generateSolution':
        return generateSolutionEUIFetch();
      case 'http://localhost:3001/listfiles/exercise/json':
        return exerciseFetch();
      default:
        return Promise.reject(new Error('fakeFetch has no handler for: ' + path));
    }
  };

  window.fetch.restore = restore;
};

export const restoreFetch = () => {
  if (restore != null) {
    restore();
  }
};

export default fakeFetch;

fakeFetch();
// fetch('/foo').catch((e) => { console.log(e.message); });
