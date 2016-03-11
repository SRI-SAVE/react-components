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
