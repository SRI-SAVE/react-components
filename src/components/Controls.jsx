
import React from 'react';
import { List, ListItem, LinearProgress } from 'material-ui';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ActionBackup from 'material-ui/lib/svg-icons/action/backup';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import TooltrayList from './TooltrayList';
import ExerciseNameField from './ExerciseNameField';
import 'whatwg-fetch';

let Controls = React.createClass({

  mixins: [ ],

  getInitialState() {
    return {
      assessment: false,
      instructorMode: false,
      loaded: false,
    };
  },

  propTypes: {
    baseServer: React.PropTypes.string.isRequired,
    height:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    onAssessment: React.PropTypes.func,
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
      height: '100%',
      onAssessment: this.onAssessment,
      onSave: this.onSave,
      savePrimaryText: 'Save Exercise', // CAT primary-text
      type: 'CAT',
      width: '100%',
    };
  },

  componentDidMount() {
    if (this.state.tooltray == null) {
      setTimeout(this.fetchTooltray, 1500);
    }
  },

  fetchTooltray() {
    fetch(this.props.baseServer + '/inventory')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (this.isMounted()) { // By the time our promise comes true the component may no longer be mounted, be sure it is first!
        this.setState({
          assessment: this.props.type !== 'CAT' && !json.instructorMode,
          instructorMode: json.instructorMode,
          tooltray: json.tooltray,
          loaded: true,
        });
      }
    })
    .catch(e => { console.error(e); });
  },

  onAssessment(/* e */) {
  },

  onReset(/* e */) {
  },

  onSave(/* e */) {
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
        { this.state.loaded? <TooltrayList container={ false } items={ this.state.tooltray }/> : <LinearProgress mode="indeterminate"/> }
        <MenuDivider/>
        <List subheader="Controls">
          <ListItem leftIcon={ <ActionRestore/> } onClick={ this.onReset } primaryText="Reset"/>
          { this.props.type === 'CAT'? <ExerciseNameField/> : null }
          { this.state.assessment?
            <ListItem leftIcon={ <ActionBackup/> } onClick={ this.onAssessment } primaryText="Assessment"/> :
            <ListItem leftIcon={ <ActionBackup/> } onClick={ this.onSave } primaryText={ this.props.savePrimaryText }/>
          }
        </List>
      </div>
    )
  },
});

export default Controls;
