/*global __WEBPACK_DEV_SERVER_DEBUG__*/
if (__WEBPACK_DEV_SERVER_DEBUG__) {
  require('./webpack-dev-server-util');
}

import './index.css';
import React from 'react';
import { EUI } from './components/EUI';
import { CAT } from './components/CAT';

const elemDiv = document.createElement('div');

elemDiv.style.cssText = 'position:fixed;top:5px;left:5px;';
elemDiv.id = 'save-react-components';

if (window._EntityLibrary) {
  React.render(<CAT/>, elemDiv);
} else {
  React.render(<EUI/>, elemDiv);
}

document.body.appendChild(elemDiv);
