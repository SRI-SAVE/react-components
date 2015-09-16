/*global __WEBPACK_DEV_SERVER_DEBUG__*/
if (__WEBPACK_DEV_SERVER_DEBUG__) {
  require('../webpack-dev-server-fetch');
}

import React from 'react';
import Controls from './Controls.jsx';
import ComponentDialog from './ComponentDialog.jsx';
import MaterialUITheme from '../mixins/material-ui-theme';
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

  mixins: [
    // ReactRenderVisualizer,
    MaterialUITheme,
  ],

  propTypes: {
    baseServerHost: React.PropTypes.string,
  },

  getInitialState() {
    return {
      exerciseList: [{ payload: '/None', text: 'None' }],
      instructorToggle: false,
      loadedExerciseList: false,
      reloadTray: false,
      selectedExerciseListIndex: 0,
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

    this.setBase({ host: this.props.baseServerHost, exercise: exerciseList[ selectedExerciseListIndex ].payload });
  },

  componentDidMount() {
    this.refs.snackbarSimulateBackend.show();
  },

  setBase(options) {
    const { host, exercise } = options;

    this.baseServer = host || this.baseServer;

    if (exercise) {
      this.baseServerAddress = this.baseServer + exercise;
    }
  },

  dismissedSimulateBackend() {
    if (!this.simulatedBackend) this.fetchExercises();

    this.setState({ noSnackbarSimulateBackend: true });
  },

  simulateBackend() {
    this.simulatedBackend = true;
    this.refs.snackbarSimulateBackend.dismiss();
    require('../webpack-dev-server-fetch');
    this.fetchExercises();
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
    this.setState({ loadedExerciseList: true });
    this.setExerciseListWidth();
  },

  saveSolution() {
    fetch(this.baseServerAddress + '/generateSolution',  { mode: 'cors' })
    .then(() => {
      this.setState({ instructorToggle: false });
      this.refs.snackbarStudentMode.show();
      this.refs.controlsComponentDialog.dismiss();
    })
    .catch(e => {
      this.refs.snackbarInstructorMode.show();
      console.error(e);
    });
  },

  fetchExercises() {
    fetch(this.baseServer + '/listfiles/exercise/json',  { mode: 'cors' })
    .then(response => response.json())
    .then(json => {
      this.processFetchedExercises(json);
    })
    .catch(e => console.error(e));
  },

  setExerciseListWidth() {
    const el = React.findDOMNode(this.refs.exerciseList);
    const menuItemsDom = React.findDOMNode(this.refs.exerciseList.refs.menuItems);

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  showAssessment() {
    this.refs.controlsComponentDialog.dismiss();
    this.refs.assessmentComponentDialog.show();
  },

  reset() {
    this.setState({ instructorToggle: false });
    this.refs.controlsComponentDialog.dismiss();
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

  onControlsClick() {
    this.refs.controlsComponentDialog.show();
  },

  onExerciseSelect(e, selectedIndex /*, menuItem */) {
    this.setState({
      instructorToggle: false,
      reloadTray: true, //this.state.selectedExerciseListIndex !== selectedIndex? true : false,
      selectedExerciseListIndex: selectedIndex,
    });

    this.setBase({ exercise: this.state.exerciseList[ selectedIndex ].payload });
    this.refs.snackbarInstructorMode.dismiss();
  },

  onInstructorModeToggle(e, toggled) {
    if (!toggled) {
      this.saveSolution();
    }
  },

  onServerInputChange(e) {
    const value = e.target.value;
    const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    const missingProtocol = value.match(/^(http|https):\/\//) == null;
    const eidx = this.state.selectedExerciseListIndex;
    let serverErrorText = '';

    if (isNumeric) {
      serverErrorText = 'This field must be a string';
    } else if (missingProtocol) {
      serverErrorText = 'Field example http://<host>:<port>';
    }

    this.setState({ serverErrorText: serverErrorText });
    this.setBase({ host: value, exercise: this.state.exerciseList[ eidx ].payload });
  },

  render() {
    const palette = this.getChildContext().muiTheme.palette;
    const canvasColor = palette.canvasColor;
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
      serverErrorText,
    } = this.state;

    return (
        <Paper style={ styles.paper }>
          <div className="clearfix" style={ styles.toolbarBlock }>
            <Toolbar style={{ backgroundColor: canvasColor }}>
              <ToolbarGroup float="left" key={ 0 }>
                <ToolbarTitle style={ styles.toolbarTitle } text="exercise"/>
                { loadedExerciseList?
                  <DropDownMenu menuItems={ exerciseList } onChange={ this.onExerciseSelect } ref="exerciseList" style={ styles.exerciseDropdown }/> :
                  <CircularProgress mode="indeterminate" size={ .5 } style={ styles.exerciseProgress }/>
                }
                <TextField
                  defaultValue={ this.props.baseServerHost }
                  errorStyle={{ color: Colors.red600 }}
                  errorText={ serverErrorText }
                  floatingLabelText="Exercise Server"
                  hintText="http://<host>:<port>"
                  onChange={ this.onServerInputChange }
                  ref="exerciseServer"
                  style={ styles.textfield }/>
              </ToolbarGroup>
              <ToolbarGroup float="right" key={ 1 }>
                <ToolbarSeparator/>
                <div style={{ width: 116 }}>
                  { instructorToggle?
                    <Toggle
                      defaultToggled
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
          <ComponentDialog onDismiss={ this.dialogDismiss } ref="controlsComponentDialog" title="EUI Controls">
            { this.state.instructorToggle?
              <Controls
                baseServerAddress={ this.baseServerAddress }
                forceUpdate={ this.state.reloadTray }
                instructorMode
                onAssessment={ this.showAssessment }
                onInstructorModeChange={ this.instructorModeChange }
                onReset= { this.reset }
                onSave={ this.saveSolution }
                savePrimaryText="Save"
                type='EUI'/> :
              <Controls
                baseServerAddress={ this.baseServerAddress }
                forceUpdate={ this.state.reloadTray }
                onAssessment={ this.showAssessment }
                onInstructorModeChange={ this.instructorModeChange }
                onReset= { this.reset }
                onSave={ this.saveSolution }
                savePrimaryText="Save"
                type='EUI'/>
            }
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
              autoHideDuration={ 3500 }
              message="Backend"
              onActionTouchTap={ this.simulateBackend }
              onDismiss={ this.dismissedSimulateBackend }
              ref="snackbarSimulateBackend"/> :
            null
          }
        </Paper>
    );
  },
});

export default EUI;
