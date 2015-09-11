
import React from 'react';
import { List, ListItem, LinearProgress, Snackbar } from 'material-ui';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ActionBackup from 'material-ui/lib/svg-icons/action/backup';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import TooltrayList from './TooltrayList';
import ExerciseNameField from './ExerciseNameField';
import 'whatwg-fetch';

let tooltray;

export const Controls = React.createClass({

  mixins: [ ],

  getInitialState() {
    return {
      assessment: false,
      instructorMode: false,
      loaded: false,
    };
  },

  propTypes: {
    baseServerAddress: React.PropTypes.string.isRequired,
    forceUpdate: React.PropTypes.bool,
    height:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    onAssessment: React.PropTypes.func,
    onInstructorModeChange: React.PropTypes.func,
    onReset: React.PropTypes.func,
    onSave: React.PropTypes.func,
    savePrimaryText: React.PropTypes.string,
    type: React.PropTypes.oneOf([ 'CAT', 'EUI' ]),
    width:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      forceUpdate: false,
      height: '100%',
      onAssessment: () => {},
      onInstructorModeChange: (/* newValue */) => {},
      onReset: () => {},
      onSave: () => {},
      savePrimaryText: 'Save Exercise', // CAT primary-text
      type: 'CAT',
      width: '100%',
    };
  },

  componentWillMount() {
    if (this.props.forceUpdate) {
      tooltray = undefined;
    } else if (tooltray) {
      this.setState({
        // assessment: this.props.type !== 'CAT' && !json.instructorMode,
        // instructorMode: json.instructorMode,
        loaded: true,
      });
    }
  },

  componentDidMount() {
    if (tooltray == null) {
      setTimeout(this.fetchTooltray, 1000);
    }
  },

  componentWillUpdate(newProps, newState) {
    if (newState.instructorMode) this.refs.snackBarInstructorMode.show();
  },

  componentWillUnmount() {
    this.props.onInstructorModeChange(this.state.instructorMode);
  },

  fetchTooltray() {
    fetch(this.props.baseServerAddress + '/inventory',  { mode: 'cors' })
    .then(response => response.json())
    .then(json => {
      if (this.isMounted()) { // By the time our promise comes true the component may no longer be mounted, be sure it is first!
        tooltray = json.tooltray;
        this.setState({
          assessment: this.props.type !== 'CAT' && !json.instructorMode,
          instructorMode: json.instructorMode,
          loaded: true,
        });
      }
    })
    .catch(e => console.error(e));
  },

  onReset(/* e */) {
    fetch(this.props.baseServerAddress + '/query',  {
      method: 'post',
      mode: 'cors',
      body: 'query=' + JSON.stringify({ type: 'Reset' }),
    })
    .then(() => {
      tooltray = undefined;
      this.props.onReset();
    })
    .catch(e => { console.error(e); });
  },

  onSave(/* e */) {
    this.setState({
      instructorMode: false,
      assessment: this.props.type !== 'CAT',
    });
    this.props.onSave();
  },

  render() {
    const styles = {
      container: {
        // backgroundColor: '#fff',
        border: 'solid 1px #d9d9d9',
        height: this.props.height,
        overflowY: 'scroll',
        width: this.props.width,
      },
    };

    return (
      <div ref="container" style={ styles.container }>
        { this.state.loaded? <TooltrayList container={ false } items={ tooltray }/> : <LinearProgress mode="indeterminate"/> }
        <MenuDivider/>
        <List subheader="Controls">
          <ListItem leftIcon={ <ActionRestore/> } onClick={ this.onReset } primaryText="Reset"/>
          { this.props.type === 'CAT'? <ExerciseNameField/> : null }
          { this.state.assessment?
            <ListItem leftIcon={ <ActionBackup/> } onClick={ this.props.onAssessment } primaryText="Assessment"/> :
            <ListItem leftIcon={ <ActionBackup/> } onClick={ this.onSave } primaryText={ this.props.savePrimaryText }/>
          }
        </List>
        <Snackbar
          autoHideDuration={ 2000 }
          message="Instructor Mode"
          ref="snackBarInstructorMode"/>
      </div>
    )
  },
});

export default Controls;
