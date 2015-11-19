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
import Toggle from 'material-ui/lib/toggle';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

// import ReactRenderVisualizer from 'react-render-visualizer';

const { Colors, Spacing  } = Styles;

export const EUI = React.createClass({

  mixins: [
    // ReactRenderVisualizer,
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
      instructorToggle: false,
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
    const exercisePathname = exerciseList.length? exerciseList[ selectedExerciseListIndex ].payload : '';

    this.setBase({ host: this.props.baseServerHost, exercise: exercisePathname });
    this.steps = [{
        text: 'React components.<br/><br/>SAVE Semantic 3D UI for content assembly and exercises',
        selector: '.rc-eui-main',
        position: 'bottom',
      }, {
        title: 'EUI Controls',
        text: 'Controls and tooltray items',
        selector: '.rc-eui-controls',
        position: 'bottom',
      },
    ];
    this.joyrideSetOptions({ type: 'guided' });
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

  requestStaticLoadedSemanticAssets() {
    fetch(`${ this.baseServerAddress }/object`,  {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      method: 'post',
      mode: 'cors',
      body: `object=${ JSON.stringify({ type: 'create', ID: null, auto: true }) }`,
    })
    .then(response => response.json())
    .then(list => { SAVE2.lib.view.loadStaticAutoAssets(list); })
    .catch(e => console.error(e));
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

  saveSolution() {
    let { controlsComponentDialog, snackbarStudentMode, snackbarInstructorMode } = this.refs;

    if (controlsComponentDialog.isOpen()) controlsComponentDialog.dismiss(); // do this first since it does a setState!

    fetch(`${ this.baseServerAddress }/generateSolution`, { mode: 'cors' })
    .then(() => {
      snackbarInstructorMode.dismiss();
      this.setState({ reloadTray: true, instructorToggle: false }, () => {
        snackbarStudentMode.show();
        this.resetEUI();
      });
    })
    .catch(e => {
      snackbarInstructorMode.show();
      console.error(e);
    });
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

  showAssessment() {
    this.refs.controlsComponentDialog.dismiss(); // setState!
    this.refs.assessmentComponentDialog.show();
  },

  sendReset() {
    return fetch(`${ this.baseServerAddress }/query`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      method: 'post',
      mode: 'cors',
      body: 'query=' + JSON.stringify({ type: 'Reset' }),
    });
  },

  reset() {
    this.refs.controlsComponentDialog.dismiss(); // setState!
    this.refs.snackbarInstructorMode.dismiss();
    this.setState({
      instructorToggle: false,
      reloadTray: true,
    }, () => {
      this.resetEUI();
    });
  },

  resetEUI() {
    if (this.state.selectedExerciseListIndex != null) {
      this.sendReset()
      .then(() => {
        this.requestStaticLoadedSemanticAssets();
        SAVE2.lib.view.reset();
      })
      .catch(e => console.error(e));
    }
  },

  dialogDismiss() {
    if (this.state.reloadTray) this.setState({ reloadTray: false });
  },

  instructorModeChange(instructorMode) {
    if (instructorMode) {
      this.refs.snackbarInstructorMode.show();
      this.setState({ instructorToggle: true });
    }
  },

  handleControlsClick() {
    SAVE2.lib.view.setBaseServerAddress(this.baseServerAddress);
    this.refs.controlsComponentDialog.show();
  },

  handleExerciseSelectChange(e, selectedIndex /*, menuItem */) {
    this.setBase({ exercise: this.state.exerciseList[ selectedIndex ].payload });
    this.setState({
      instructorToggle: false,
      reloadTray: true,
      selectedExerciseListIndex: selectedIndex,
    }, () => {
      this.resetEUI();
    });
  },

  handleInstructorModeToggle(e, toggle) {
    if (!toggle) {
      this.saveSolution();
    }
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
      this.setBase({ host: value, exercise: '' });
      this.setState({
        exerciseList: [ ],
        instructorToggle: false,
        loadedExerciseList: false,
        reloadTray: true,
        selectedExerciseListIndex: null,
        serverErrorText: serverErrorText,
      }, () => {
        this.fetchExercises();
      });
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
      instructorToggle,
      loadedExerciseList,
      reloadTray,
      selectedExerciseListIndex,
      serverErrorText,
    } = this.state;
    const controlsProps = {
      baseServerAddress: this.baseServerAddress,
      forceUpdate: reloadTray,
      instructorMode: instructorToggle,
      onAssessment: this.showAssessment,
      onInstructorModeChange: this.instructorModeChange,
      onReset: this.reset,
      onSave: this.saveSolution,
      onToolTrayItemClick: this.handleToolTrayItemClick,
      savePrimaryText: 'Save',
      type: 'EUI',
    };
    const controlsIconButtonProps = {
      className: 'rc-eui-controls',
      disabled: !loadedExerciseList,
      onClick: this.handleControlsClick,
      tooltip: 'Controls',
    };

    return (
        <Paper style={ styles.paper }>
          <div style={ styles.toolbarBlock }>
            <Toolbar className="rc-eui-main" style={{ backgroundColor: canvasColor }}>
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
                  { instructorToggle?
                    <Toggle
                      defaultToggled
                      onToggle={ this.handleInstructorModeToggle }
                      ref="instructorToggle"
                      style={{ display: 'inline-block', width: 42 }}/> :
                    null
                  }
                  <IconButton { ...controlsIconButtonProps }>
                    <NavigationMenu/>
                  </IconButton>
                </div>
              </ToolbarGroup>
            </Toolbar>
          </div>
          <ComponentDialog onDismiss={ this.dialogDismiss } ref="controlsComponentDialog" title="EUI Controls">
            <Controls { ...controlsProps }/>
          </ComponentDialog>
          <ComponentDialog ref="assessmentComponentDialog" title="Assessment">
            <div style={ styles.assessment }>
              <iframe
                name="assessment"
                src="data:text/html;base64,PGh0bWw+PGJvZHk+PGRpdiBpZD0iY29udGVudCI+PHA+PGI+WW91IGZvcmdvdCB0aGVzZSBzdGVwczo8L2I+PGJyLz48dWw+PGxpPlB1bGwgYW5kIGhvbGQgY2hhcmdpbmcgaGFuZGxlIDwvbGk+PGxpPlB1c2ggYW5kIGhvbGQgYm90dG9tIG9mIGJvbHQgY2F0Y2ggPC9saT48bGk+UmVsZWFzZSBjaGFyZ2luZyBoYW5kbGUgdG8gY29jayByaWZsZSA8L2xpPGxpPkxldCBnbyBvZiBib2x0IGNhdGNoIGJvdHRvbSA8L2xpPjxsaT5SZXR1cm4gY2hhcmdpbmcgaGFuZGxlIHRvIGZvcndhcmQgcG9zaXRpb24gPC9saT48bGk+Q2hlY2sgY2hhbWJlciBmb3IgYW1tbyA8L2xpPjxsaT5TZWxlY3QgPGk+U2FmZTwvaT4gbW9kZSA8L2xpPjxsaT5SZWxlYXNlIGJvbHQgYnkgcHVzaGluZyBib2x0IGNhdGNoIHRvcCA8L2xpPjxsaT5TZWxlY3QgPGk+U2VtaTwvaT4gbW9kZSA8L2xpPjxsaT5QdWxsIHRyaWdnZXIgdG8gZmlyZSB0aGUgd2VhcG9uIDwvbGk+PGxpPlB1bGwgYW5kIGhvbGQgY2hhcmdpbmcgaGFuZGxlIDwvbGk+PGxpPlJlbGVhc2UgY2hhcmdpbmcgaGFuZGxlIHRvIGNvY2sgcmlmbGUgPC9saT48bGk+U2VsZWN0IDxpPlNhZmU8L2k+IG1vZGUgPC9saT48L3VsPjwvcD48L2Rpdj48L2JvZHk+PC9odG1sPgo="
                style={ styles.assessment }/> { /* src={ this.baseServerAddress + '/assessment' } */}
            </div>
          </ComponentDialog>
          <Snackbar
            autoHideDuration={ 0 }
            message="Instructor Mode"
            ref="snackbarInstructorMode"/>
          <Snackbar
            autoHideDuration={ 0 }
            message="Student Mode"
            ref="snackbarStudentMode"/>
          { !this.state.noSnackbarSimulateBackend?
            <Snackbar
              action="Simulate"
              autoHideDuration={ 0 }
              message="Backend"
              onActionTouchTap={ this.simulateBackend }
              ref="snackbarSimulateBackend"/> :
            null
          }
        </Paper>
    );
  },
});

export default EUI;
