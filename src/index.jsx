/*global __WEBPACK_DEV_SERVER_DEBUG__*/
if (__WEBPACK_DEV_SERVER_DEBUG__) {
  require('./webpack-dev-server-fetch');
}

import './index.css';

import React from 'react';
import Controls from './components/Controls.jsx';
import ComponentDialog from './components/ComponentDialog.jsx';
import MaterialUITheme from './mixins/material-ui-theme';
import mui from 'material-ui';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';

// import ReactRenderVisualizer from 'react-render-visualizer';

const {
  CircularProgress,
  DropDownMenu,
  Paper,
  IconButton,
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
    return {
      loadedExerciseList: false,
      exerciseList: [{ xnid: 1, name: 'None', text: 'None' }],
    };
  },

  componentDidMount() {
    if (this.state.tooltray == null) {
      setTimeout(this.fetchExercises, 1500);
    }
  },

  fetchExercises() {
    fetch('http://localhost:3001/listfiles/exercise/json')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (this.isMounted()) { // By the time our promise comes true the component may no longer be mounted, be sure it is first!
        let list = this.state.exerciseList;

        json.forEach((e, i) => {
          list.push({
            xnid: 1 + i,
            name: null,
            text: e.replace('http://localhost:3001', ''),
          });
        });
        this.setState({
          exerciseList: list,
          loadedExerciseList: true,
        });
      }
    })
    .catch(e => { console.error(e); });
  },

  onControlsClick() {
    this.refs.controlsComponentDialog.show();
  },

  onExerciseSelect(e) {
    console.log(e);
  },

  render() {
    const palette = this.getChildContext().muiTheme.palette;
    const canvasColor = palette.canvasColor;
    const styles = {
      paper: {
        backgroundColor: canvasColor,
        fontFamily: '"Roboto", sans-serif',
        marginBottom: 32,
      },

      exerciseProgress: {
        width: 80,
      },

      textfield: {
        // marginTop: '-15',
        top: '-15',
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
                { this.state.loadedExerciseList? <DropDownMenu menuItems={ this.state.exerciseList } onChange={ this.onExerciseSelect } style={ styles.exerciseDropdown }/> : <CircularProgress mode="indeterminate" size={ .5 } style={ styles.exerciseProgress }/> }
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
                <ToolbarSeparator/>
              <IconButton onClick={ this.onControlsClick } tooltip="Controls">
                  <NavigationMenu/>
                </IconButton>
              </ToolbarGroup>
            </Toolbar>
          </div>
          <ComponentDialog ref="controlsComponentDialog" title="EUI Controls">
            <Controls baseServer="/exercises/071-100-0032/step01/m4_flora_clear/inventory" savePrimaryText="Save" type='EUI'/>
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
