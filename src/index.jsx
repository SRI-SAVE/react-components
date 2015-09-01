
import './index.css';

import React from 'react';
import Controls from './components/Controls.jsx';
import ComponentDialog from './components/ComponentDialog.jsx';
import MaterialUITheme from './mixins/material-ui-theme';
import mui from 'material-ui';

// import ReactRenderVisualizer from 'react-render-visualizer';

const {
  DropDownMenu,
  Paper,
  RaisedButton,
  Styles,
  TextField,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} = mui;
const { Colors, Spacing  } = Styles;

let App = React.createClass({

  mixins: [
    // ReactRenderVisualizer,
    MaterialUITheme,
  ],

  getInitialState() {
    return { };
  },

  handleControlsClick() {
    this.refs.controlsComponentDialog.show();
  },

  render() {
    let exerciseList = [
      { payload: '1', text: 'None' },
    ];

    const palette = this.getChildContext().muiTheme.palette;
    const canvasColor = palette.canvasColor;
    const styles = {
      paper: {
        backgroundColor: canvasColor,
        fontFamily: '"Roboto", sans-serif',
        marginBottom: 32,
      },

      textfield: {
        marginTop: '-15',
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
                <DropDownMenu menuItems={ exerciseList } style={ styles.exerciseDropdown }/>
                  <TextField
                    defaultValue="http://localhost:3001"
                    errorStyle={{ color: Colors.red600 }}
                    errorText={ this.state.serverErrorText }
                    floatingLabelText="Exercise Server"
                    hintText="http://<host>:<port>"
                    onChange={ this.handleServerInputChange }
                    style={ styles.textfield }/>
              </ToolbarGroup>
              <ToolbarGroup float="right" key={ 1 }>
                <ToolbarTitle style={ styles.toolbarTitle } text="save"/>
                <ToolbarSeparator/>
                <RaisedButton label="Controls" onClick={ this.handleControlsClick }/>
              </ToolbarGroup>
            </Toolbar>
          </div>
          <ComponentDialog ref="controlsComponentDialog" title="EUI Controls">
            <Controls type='CAT'/>
          </ComponentDialog>
        </Paper>
    );
  },
});

const elemDiv = document.createElement('div');

elemDiv.style.cssText = 'position:fixed;top:5;left:5;';
React.render(<App/>, elemDiv);
document.body.appendChild(elemDiv);

// Needed for React Developer Tools
if (typeof window !== 'undefined') {
    window.React = React;
}
