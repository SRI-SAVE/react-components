/*global SAVE2*/

import './index.css';
import React from 'react';
import './sandbox';
import { EUI } from './components/EUI';
import { CAT } from './components/CAT';

// let steps = [{
//     text: 'React components.<br/><br/>SAVE Semantic 3D UI for content assembly and exercises',
//     selector: '.rc-cat-main',
//     position: 'bottom',
//   }, {
//     title: 'CAT Controls',
//     text: 'Controls and tooltray items',
//     selector: '.rc-cat-controls',
//     position: 'bottom',
//   },
// ];

const elemDiv = document.createElement('div');

elemDiv.style.cssText = 'position:fixed;top:5px;left:5px;';
elemDiv.id = 'save-react-components';

if (SAVE2.isCAT()) {
  // React.render(<CAT steps={ steps }/>, elemDiv);
  React.render(<CAT/>, elemDiv);
} else {
  React.render(<EUI/>, elemDiv);
}

document.body.appendChild(elemDiv);
