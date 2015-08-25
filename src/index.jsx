// See why this is here, there ...
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// http://material-ui.com/#/get-started

import './index.css';

import React from 'react';
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
  ToolbarTitle,
} = mui;
const { Spacing, Typography } = mui.Styles;

const ThemeManager = new mui.Styles.ThemeManager();

let App = React.createClass({

  mixins: [
    ReactRenderVisualizer,
    MaterialUITheme,
  ],

  getInitialState() {
    return {
      controlsVisible: false,
    };
  },

  handleControlsClick() {
    console.log('clicked');
    this.setState({
      controlsVisible: true,
    });
  },

  render() {
    let filterOptions = [
      { payload: '1', text: 'None' },
      { payload: '2', text: 'ExerciseA' },
      { payload: '3', text: 'ExerciseB' },
      { payload: '4', text: 'ExerciseC' },
    ];
    let iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' },
    ];

    let palette = ThemeManager.getCurrentTheme().palette;
    let borderColor = palette.borderColor;
    let canvasColor = palette.canvasColor;

    const styles = {
      paper: {
        backgroundColor: canvasColor,
        fontFamily: '"Roboto", sans-serif',
        marginBottom: 32,
      },

      toolbarBlock: {
        borderRadius: '0 0 2px 0',
        padding: Spacing.desktopGutter,
        margin: 0,
      },

      toolbarTitle: {
        textTransform: 'uppercase',
      },

      exerciseDropdown: {
        width: 200,
      },
    };

    return (
        <Paper style={ styles.paper }>
          <div className="clearfix" style={ styles.toolbarBlock }>
            <Toolbar style={{ backgroundColor: canvasColor }}>
              <ToolbarGroup float="left" key={ 0 }>
                <ToolbarTitle style={ styles.toolbarTitle } text="exercise"/>
                <DropDownMenu menuItems={ filterOptions } style={ styles.exerciseDropdown }/>
              </ToolbarGroup>
              <ToolbarGroup float="right" key={ 1 }>
                <ToolbarTitle style={ styles.toolbarTitle } text="save"/>
                <FontIcon className="muidocs-icon-custom-sort"/>
                <DropDownIcon iconClassName="muidocs-icon-navigation-expand-more" menuItems={ iconMenuItems }/>
                <ToolbarSeparator/>
              <RaisedButton label="Controls" onClick={ this.handleControlsClick } primary={ true }/>
              </ToolbarGroup>
            </Toolbar>
          </div>
          { this.state.controlsVisible? <CatControls/> : null }
        </Paper>
    );
  },
});

const elemDiv = document.createElement('div');

React.render(<App/>, elemDiv);
document.body.appendChild(elemDiv);

// Needed for React Developer Tools
if (typeof window !== 'undefined') {
    window.React = React;
}
