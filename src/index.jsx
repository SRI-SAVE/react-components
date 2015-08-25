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

import ReactRenderVisualizer from 'react-render-visualizer';

const {
  DropDownIcon,
  DropDownMenu,
  FontIcon,
  Paper,
  RaisedButton,
  Styles,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} = mui;
const { Spacing, Typography } = mui.Styles;

let ThemeManager = new mui.Styles.ThemeManager();

let App = React.createClass({

  mixins: [
    ReactRenderVisualizer,
    MaterialUITheme
  ],

  getInitialState() {
    return {
      controlsVisible: false
    };
  },

  handleControlsClick() {
    console.log('clicked');
    this.setState({
      controlsVisible: true
    });
  },

  render() {
    let filterOptions = [
      { payload: '1', text: 'Select Exercise' },
      { payload: '2', text: 'ExerciseA' },
      { payload: '3', text: 'ExerciseB' },
      { payload: '4', text: 'ExerciseC' },
    ];
    let iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];

    let palette = ThemeManager.getCurrentTheme().palette;
    let borderColor = palette.borderColor;
    let canvasColor = palette.canvasColor;

    let styles = {
      root: {
        backgroundColor: canvasColor,
        fontFamily: '"Roboto", sans-serif',
        marginBottom: 32
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: Spacing.desktopGutter,
        margin: 0
      }
    };

    return (
        <Paper style={ styles.root }>
          <div className="clearfix" style={ styles.exampleBlock }>
            <Toolbar>
              <ToolbarGroup float="left" key={ 0 }>
                <ToolbarTitle text="Exercise"/>
                <DropDownMenu menuItems={ filterOptions } style={{ width: 192 }}/>
              </ToolbarGroup>
              <ToolbarGroup float="right" key={ 1 }>
                <ToolbarTitle text="SAVE"/>
                <FontIcon className="muidocs-icon-custom-sort"/>
                <DropDownIcon iconClassName="muidocs-icon-navigation-expand-more" menuItems={ iconMenuItems }/>
                <ToolbarSeparator/>
              <RaisedButton label="Controls" onClick={ this.handleControlsClick } primary={ true }/>
              </ToolbarGroup>
            </Toolbar>
          </div>
          <CatControls/>
        </Paper>
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
