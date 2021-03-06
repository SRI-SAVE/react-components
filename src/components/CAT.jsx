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

import React from 'react';
import { PureRenderMixin } from 'react/addons';
import joyride from 'react-joyride';
import 'react-joyride/lib/styles/react-joyride.css';
import Controls from './Controls.jsx';
import ComponentDialog from './ComponentDialog.jsx';
import MaterialUITheme from '../mixins/material-ui-theme';
import CircularProgress from 'material-ui/lib/circular-progress';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import Snackbar from 'material-ui/lib/snackbar';
import Styles from 'material-ui/lib/styles/';
import TextField from 'material-ui/lib/text-field';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

const { Colors, Spacing  } = Styles;

export const CAT = React.createClass({

  mixins: [
    joyride.Mixin,
    MaterialUITheme,
    PureRenderMixin,
  ],

  propTypes: {
    baseServerHost: React.PropTypes.string,
  },

  getInitialState() {
    return {
      exerciseList: [ ],
      loadedExerciseList: false,
      reloadTray: false,
      selectedExerciseListIndex: null,
      serverErrorText: '',
    };
  },

  getDefaultProps() {
    return {
      baseServerHost: 'http://localhost:3001',
    }
  },

  componentWillMount() {
    const { selectedExerciseListIndex, exerciseList } = this.state;
    const exercisePathname = exerciseList.length? exerciseList[ selectedExerciseListIndex ].payload : '/CAT';

    this.setBase({ host: this.props.baseServerHost, exercise: exercisePathname });
    this.steps = [{
        text: 'React components.<br/><br/>SAVE Semantic 3D UI for content assembly and exercises',
        selector: '.rc-cat-main',
        position: 'bottom',
      }, {
        title: 'CAT Controls',
        text: 'Controls and tooltray items',
        selector: '.rc-cat-controls',
        position: 'bottom',
      },
    ];
    this.joyrideSetOptions({
      // debug: true,
      completeCallback: (steps, skipped) => {
          console.log('completeCallback', steps, skipped);
      },
      showSkipButton: true,
      stepCallback: (step) => {
          console.log('stepCallback', step);
      },
      type: 'guided',
    });
  },

  componentDidMount() {
    this.fetchExercises().catch(e => {
      console.error(e);
      this.refs.snackbarSimulateBackend.show()
    });
  },

  setBase(options) {
    const { host, exercise } = options;

    this.baseServer = host || this.baseServer;
    this.baseServerAddress = `${ this.baseServer }${ exercise }`;
  },

  simulateBackend() {
    this.refs.snackbarSimulateBackend.dismiss();
    SAVE2.simulate();
    this.fetchExercises().catch(e => console.error(e));
  },

  processFetchedExercises(json) {
    const list = this.state.exerciseList;

    json.forEach(e /*, i */ => {
      const pathName = e.replace(this.baseServer, '');

      list.push({
        payload: pathName,
        text: pathName,
      });
    });
    this.setState({ loadedExerciseList: true }, () => {
      this.setExerciseListWidth();
      this.joyrideAddSteps(this.steps, true);
    });
  },

  saveExercise(exercise, staticIds) {
    let { controlsComponentDialog } = this.refs;

    if (controlsComponentDialog.isOpen()) controlsComponentDialog.dismiss(); // do this first since it does a setState!

    fetch(`${ this.baseServerAddress }/finishExercise`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      method: 'post',
      mode: 'cors',
      body: `save=${JSON.stringify({ exercise: exercise, auto: staticIds })}`,
    })
    .catch(e => console.error(e));
  },

  fetchExercises() {
    return fetch(`${ this.baseServer }/listfiles/exercise/json`, { mode: 'cors' })
    .then(response => response.json())
    .then(json => this.processFetchedExercises(json));
  },

  setExerciseListWidth() {
    const el = React.findDOMNode(this.refs.exerciseList);
    const menuItemsDom = React.findDOMNode(this.refs.exerciseList.refs.menuItems);

    el.style.width = `${ menuItemsDom.offsetWidth }px`;
  },

  reset() {
    this.refs.controlsComponentDialog.dismiss();
  },

  dialogDismiss() {
    if (this.state.reloadTray) this.setState({ reloadTray: false });
  },

  handleControlsClick() {
    SAVE2.lib.view.setBaseServerAddress(this.baseServerAddress);
    this.refs.controlsComponentDialog.show();
  },

  handleExerciseSelectChange(e, selectedIndex /*, menuItem */) {
    this.setState({
      reloadTray: true,
      selectedExerciseListIndex: selectedIndex,
    });

    this.setBase({ exercise: this.state.exerciseList[ selectedIndex ].payload });
  },

  handleServerInputChange(e) {
    const value = e.target.value;
    const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    const missingProtocol = value.match(/^(http|https):\/\//) == null;
    let serverErrorText = '';

    if (isNumeric) {
      serverErrorText = 'This field must be a string';
    } else if (missingProtocol) {
      serverErrorText = 'Field example http://<host>:<port>';
    }

    if (isNumeric || missingProtocol) {
      this.setState({ serverErrorText: serverErrorText });
      return;
    }

    if (value !== this.baseServer) {
      this.setState({
        exerciseList: [ ],
        loadedExerciseList: false,
        reloadTray: true,
        selectedExerciseListIndex: null,
        serverErrorText: serverErrorText,
      });
      this.setBase({ host: value, exercise: '' });
      this.fetchExercises();
    }
  },

  handleToolTrayItemClick(/* itemIdx */) {
    this.refs.controlsComponentDialog.dismiss();
  },

  render() {
    const canvasColor = LightRawTheme.palette.canvasColor;
    const styles = {
      assessment: {
        border: 0,
        height: 600,
        width: '100%',
      },

      paper: {
        backgroundColor: canvasColor,
        fontFamily: '"Roboto", sans-serif',
        marginBottom: 32,
      },

      exerciseDropdown: {
        float: 'right',
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
    const {
      exerciseList,
      loadedExerciseList,
      reloadTray,
      selectedExerciseListIndex,
      serverErrorText,
    } = this.state;
    const controlsProps = {
      baseServerAddress: this.baseServerAddress,
      forceUpdate: reloadTray,
      onReset: this.reset,
      onSave: this.saveExercise,
      onToolTrayItemClick: this.handleToolTrayItemClick,
      savePrimaryText: 'Save Exercise',
      type: 'CAT',
    };
    const controlsIconButtonProps = {
      className: 'rc-cat-controls',
      disabled: !loadedExerciseList,
      onClick: this.handleControlsClick,
      tooltip: 'Controls',
    };

    return <Paper style={ styles.paper }>
      <div style={ styles.toolbarBlock }>
        <Toolbar className="rc-cat-main" style={{ backgroundColor: canvasColor }}>
          <ToolbarGroup float="left" key={ 0 }>
            <ToolbarTitle style={ styles.toolbarTitle } text="exercise"/>
              <TextField
                defaultValue={ this.props.baseServerHost }
                errorStyle={{ color: Colors.red600 }}
                errorText={ serverErrorText }
                floatingLabelText="Exercise Server"
                hintText="http://<host>:<port>"
                onChange={ this.handleServerInputChange }
                ref="exerciseServer"
                style={ styles.textfield }/>
            { loadedExerciseList?
              <DropDownMenu
                menuItems={ exerciseList }
                onChange={ this.handleExerciseSelectChange }
                ref="exerciseList"
                selectedIndex={ selectedExerciseListIndex }
                style={ styles.exerciseDropdown }/> :
              <CircularProgress mode="indeterminate" size={ .5 } style={ styles.exerciseProgress }/>
            }
          </ToolbarGroup>
          <ToolbarGroup float="right" key={ 1 }>
            <ToolbarSeparator/>
            <div style={{ width: 116 }}>
              <IconButton { ...controlsIconButtonProps }>
                <NavigationMenu/>
              </IconButton>
            </div>
          </ToolbarGroup>
        </Toolbar>
      </div>
      <ComponentDialog onDismiss={ this.dialogDismiss } ref="controlsComponentDialog" title="CAT Controls">
        <Controls { ...controlsProps }/>
      </ComponentDialog>
      { !this.state.noSnackbarSimulateBackend?
        <Snackbar
          action="Simulate"
          autoHideDuration={ 0 }
          message="Backend"
          onActionTouchTap={ this.simulateBackend }
          ref="snackbarSimulateBackend"/> :
        null
      }
    </Paper>;
  },
});

export default CAT;
