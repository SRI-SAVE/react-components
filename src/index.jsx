// See why this is here, there ...
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// http://material-ui.com/#/get-started

import './index.css';

import React from 'react';
// import ClickCounterButton from './components/ClickCounterButton';
// import ButtonComponent from './components/ButtonComponent';
// import SimpleMenu from './components/SimpleMenu';
// import TooltrayList from './components/TooltrayList.jsx';
import CatControls from './components/CatControls.jsx';
import MaterialUITheme from './mixins/material-ui-theme';
import mui from 'material-ui';

// import ReactRenderVisualizer from 'react-render-visualizer';

let ThemeManager = new mui.Styles.ThemeManager();

let App = React.createClass({

  mixins: [
    // ReactRenderVisualizer,
    MaterialUITheme
  ],

  getInitialState() {
    return { };
  },

  render() {

    return (
      <div>
        { /*
        <ClickCounterButton disabled={ false }/>
        <p style={{ marginBottom: '24px' }}/>
        <ButtonComponent/>
        <p style={{ marginBottom: '24px' }}/>
        <SimpleMenu/>
        <TooltrayList clearFix={ true }/>
        */ }
        <CatControls/>
      </div>
    );
  }
});

let elemDiv = document.createElement('div');
// elemDiv.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000;';

React.render(<App/>, elemDiv);
document.body.appendChild(elemDiv);

// Needed for React Developer Tools
if (typeof window !== 'undefined') {
    window.React = React;
}
