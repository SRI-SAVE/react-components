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
  Snackbar,
  Styles,
  TextField,
  Toggle,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} = mui;
const { Colors, Spacing  } = Styles;

export const EUI = React.createClass({

  statics: {
    baseServer: 'http://localhost:3001',
  },

  mixins: [
    // ReactRenderVisualizer,
    MaterialUITheme,
  ],

  getInitialState() {
    return {
      exerciseList: [{ payload: 'None', text: 'None' }],
      instructorToggle: false,
      loadedExerciseList: false,
      selectedExerciseListIndex: 0,
      serverErrorText: '',
    };
  },

  componentDidMount() {
    if (this.state.tooltray == null) {
      setTimeout(this.fetchExercises, 1500);
    }
  },

  processFetchedExercises(exerciseServer, json) {
    const list = this.state.exerciseList;

    json.forEach((e /*, i */) => {
      const pathName = e.replace(exerciseServer, '');

      list.push({
        payload: pathName,
        text: pathName,
      });
    });
    this.setState({
      exerciseList: list,
      loadedExerciseList: true,
    });
    this.setExerciseListWidth();
  },

  saveSolution() {
    fetch(this.state.exerciseList[ this.state.selectedExerciseListIndex ].payload + '/generateSolution')
    .then(() => {
      this.setState({ instructorToggle: false });
    })
    .catch(e => {
      this.refs.snackbarInstructorMode.show();
      console.error(e);
    });
  },

  fetchExercises() {
    const exerciseServer = this.refs.exerciseServer.getValue();

    fetch(exerciseServer + '/listfiles/exercise/json')
    .then(response => response.json())
    .then(json => {
      if (this.isMounted()) { // By the time our promise comes true the component may no longer be mounted, be sure it is first!
        this.processFetchedExercises(exerciseServer, json);
      }
    })
    .catch(e => console.error(e));
  },

  setExerciseListWidth() {
    const el = React.findDOMNode(this.refs.exerciseList);
    const menuItemsDom = React.findDOMNode(this.refs.exerciseList.refs.menuItems);

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  onControlsClick() {
    this.refs.controlsComponentDialog.show();
  },

  onExerciseSelect(e, selectedIndex /*, menuItem */) {
    this.setState({
      instructorToggle: false,
      selectedExerciseListIndex: selectedIndex,
    });
    this.refs.snackbarInstructorMode.dismiss();
  },

  onInstructorModeChange(instructorMode) {
    if (instructorMode) {
      this.refs.snackbarInstructorMode.show();
      this.setState({ instructorToggle: true });
    }
  },

  onInstructorModeToggle(e, toggled) {
    if (!toggled) {
      this.saveSolution();
    }
  },

  onServerInputChange(e) {
    const value = e.target.value;
    const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    this.setState({
      serverErrorText: !isNumeric ? '' : 'This field must be a string',
    });
    EUI.baseServer = value;
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

      exerciseDropdown: {
        width: 200,
      },

      exerciseProgress: {
        width: 80,
      },

      textfield: {
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
    };

    return (
        <Paper style={ styles.paper }>
          <div className="clearfix" style={ styles.toolbarBlock }>
            <Toolbar style={{ backgroundColor: canvasColor }}>
              <ToolbarGroup float="left" key={ 0 }>
                <ToolbarTitle style={ styles.toolbarTitle } text="exercise"/>
                { this.state.loadedExerciseList?
                  <DropDownMenu menuItems={ this.state.exerciseList } onChange={ this.onExerciseSelect } ref="exerciseList" style={ styles.exerciseDropdown }/> :
                  <CircularProgress mode="indeterminate" size={ .5 } style={ styles.exerciseProgress }/>
                }
                <TextField
                  defaultValue={ EUI.baseServer }
                  errorStyle={{ color: Colors.red600 }}
                  errorText={ this.state.serverErrorText }
                  floatingLabelText="Exercise Server"
                  hintText="http://<host>:<port>"
                  onChange={ this.onServerInputChange }
                  ref="exerciseServer"
                  style={ styles.textfield }/>
              </ToolbarGroup>
              <ToolbarGroup float="right" key={ 1 }>
                <ToolbarSeparator/>
                <div style={{ width: 116 }}>
                  { this.state.instructorToggle?
                    <Toggle
                      defaultToggled={ true }
                      onToggle={ this.onInstructorModeToggle }
                      ref="instructorToggle"
                      style={{ display: 'inline-block', width: 42 }}/> :
                    null
                  }
                  <IconButton onClick={ this.onControlsClick } tooltip="Controls">
                    <NavigationMenu/>
                  </IconButton>
                </div>
              </ToolbarGroup>
            </Toolbar>
          </div>
          <ComponentDialog ref="controlsComponentDialog" title="EUI Controls">
            <Controls
              baseServer={ this.state.exerciseList[ this.state.selectedExerciseListIndex ].payload }
              onInstructorModeChange={ this.onInstructorModeChange }
              onSave={ this.saveSolution }
              savePrimaryText="Save"
              type='EUI'/>
          </ComponentDialog>
          <Snackbar
            autoHideDuration={ 0 }
            message="Instructor Mode"
            ref="snackbarInstructorMode"/>
        </Paper>
    );
  },
});

export default EUI;
