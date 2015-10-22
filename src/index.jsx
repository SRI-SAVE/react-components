/*global SAVE2*/

import './index.css';
import React from 'react';
import './sandbox';
import { EUI } from './components/EUI';
import { CAT } from './components/CAT';

const elemDiv = document.createElement('div');

elemDiv.style.cssText = 'position:fixed;top:5px;left:5px;';
elemDiv.id = 'save-react-components';

if (SAVE2.isCAT()) {
  React.render(<CAT/>, elemDiv);
} else {
  React.render(<EUI/>, elemDiv);
}

document.body.appendChild(elemDiv);
