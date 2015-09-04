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
      exerciseList: [{ payload: 'None', text: 'None' }],
      loadedExerciseList: false,
      selectedExerciseListIndex: 0,
    };
  },

  componentDidMount() {
    if (this.state.tooltray == null) {
      setTimeout(this.fetchExercises, 1500);
    }
  },

  fetchExercises() {
    let exerciseServer = this.refs.exerciseServer.getValue();

    fetch(exerciseServer + '/listfiles/exercise/json')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (this.isMounted()) { // By the time our promise comes true the component may no longer be mounted, be sure it is first!
        let list = this.state.exerciseList;

        json.forEach((e /*, i */) => {
          let pathName = e.replace(exerciseServer, '');

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
      }
    })
    .catch(e => { console.error(e); });
  },

  setExerciseListWidth() {
    let el = React.findDOMNode(this.refs.exerciseList);
    let menuItemsDom = React.findDOMNode(this.refs.exerciseList.refs.menuItems);

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  onControlsClick() {
    this.refs.controlsComponentDialog.show();
  },

  onExerciseSelect(e, selectedIndex /*, menuItem */) {
    this.setState({ selectedExerciseListIndex: selectedIndex });
  },

  onSnackbarAction() {
    this.refs.snackbarInstructorMode.dismiss();
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
                  defaultValue="http://localhost:3001"
                  errorStyle={{ color: Colors.red600 }}
                  errorText={ this.state.serverErrorText }
                  floatingLabelText="Exercise Server"
                  hintText="http://<host>:<port>"
                  onChange={ this.handleServerInputChange }
                  ref="exerciseServer"
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
            <Controls baseServer={ this.state.exerciseList[ this.state.selectedExerciseListIndex ].payload } savePrimaryText="Save" type='EUI'/>
          </ComponentDialog>
          <Snackbar
            action="close"
            autoHideDuration={ 0 }
            message="Instructor Mode"
            onActionTouchTap={ this.onSnackbarAction }
            openOnMount={ true }
            ref="snackbarInstructorMode"/>
        </Paper>
    );
  },
});

const elemDiv = document.createElement('div');

elemDiv.style.cssText = 'position:fixed;top:5;left:5;';
React.render(<App/>, elemDiv);
document.body.appendChild(elemDiv);
