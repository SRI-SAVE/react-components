
import './index.css';
import React from 'react';
import { EUI } from './components/EUI';

const elemDiv = document.createElement('div');

elemDiv.style.cssText = 'position:fixed;top:5px;left:5px;';
elemDiv.id = 'save-react-components';
React.render(<EUI/>, elemDiv);
document.body.appendChild(elemDiv);
