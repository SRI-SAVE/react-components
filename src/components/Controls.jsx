
import React from 'react';
import { List, ListItem, LinearProgress } from 'material-ui';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ActionBackup from 'material-ui/lib/svg-icons/action/backup';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import TooltrayList from './TooltrayList';
import ExerciseNameField from './ExerciseNameField';
import 'whatwg-fetch';

export const Controls = React.createClass({

  statics: {
    tooltray: undefined,
  },

  // mixins: [ ],

  getInitialState() {
    return {
      hasAssessmentChoice: false,
      instructorMode: false,
      loaded: false,
    };
  },

  propTypes: {
    baseServerAddress: React.PropTypes.string.isRequired,
    forceUpdate: React.PropTypes.bool,
    hasAssessmentChoice: React.PropTypes.bool,
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
      Controls.tooltray = undefined;
    } else if (Controls.tooltray) {
      this.setState({
        loaded: true,
      });
    }
  },

  componentDidMount() {
    if (Controls.tooltray == null) {
      setTimeout(this.fetchTooltray, 1000);
    }
  },

  // componentWillUpdate(newProps, newState) {
  //   if (newState.instructorMode) {
  //     this.refs.snackBarInstructorMode.show();
  //   }
  // },

  fetchTooltray() {
    fetch(this.props.baseServerAddress + '/inventory',  { mode: 'cors' })
    .then(response => response.json())
    .then(json => {
      if (this.isMounted()) { // By the time our promise comes true the component may no longer be mounted, be sure it is first!
        Controls.tooltray = json.tooltray;
        this.props.onInstructorModeChange(json.instructorMode);
        this.setState({
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
      Controls.tooltray = undefined;
      this.setState({ instructorMode: false });
      this.props.onReset();
    })
    .catch(e => { console.error(e); });
  },

  onSave(/* e */) {
    if (this.props.hasAssessmentChoice) this.setState({ instructorMode: false });

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
        { this.state.loaded? <TooltrayList container={ false } items={ Controls.tooltray }/> : <LinearProgress mode="indeterminate"/> }
        <MenuDivider/>
        <List subheader="Controls">
          <ListItem leftIcon={ <ActionRestore/> } onClick={ this.onReset } primaryText="Reset"/>
          { this.props.type === 'CAT'? <ExerciseNameField/> : null }
          { this.props.hasAssessmentChoice && !this.state.instructorMode?
            <ListItem leftIcon={ <ActionBackup/> } onClick={ this.props.onAssessment } primaryText="Assessment"/> :
            null
          }
          { this.state.loaded && !this.props.hasAssessmentChoice?
            <ListItem leftIcon={ <ActionBackup/> } onClick={ this.onSave } primaryText={ this.props.savePrimaryText }/> :
            null
          }
        </List>
      </div>
    )
  },
});

export default Controls;
