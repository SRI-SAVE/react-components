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

const {
  DropDownIcon,
  DropDownMenu,
  FontIcon,
  RaisedButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} = mui;

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
    let filterOptions = [
      { payload: '1', text: 'All Broadcasts' },
      { payload: '2', text: 'All Voice' },
      { payload: '3', text: 'All Text' },
      { payload: '4', text: 'Complete Voice' },
      { payload: '5', text: 'Complete Text' },
      { payload: '6', text: 'Active Voice' },
      { payload: '7', text: 'Active Text' },
    ];
    let iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float="left" key={ 0 }>
            <DropDownMenu menuItems={ filterOptions }/>
          </ToolbarGroup>
          <ToolbarGroup float="right" key={ 1 }>
            <ToolbarTitle text="Options"/>
            <FontIcon className="muidocs-icon-custom-sort"/>
            <DropDownIcon iconClassName="muidocs-icon-navisgation-expand-more" menuItems={ iconMenuItems }/>
            <ToolbarSeparator/>
            <RaisedButton label="Create Broadcast" primary={ true }/>
          </ToolbarGroup>
        </Toolbar>

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
