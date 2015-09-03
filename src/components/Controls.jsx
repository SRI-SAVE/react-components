/*global __WEBPACK_DEV_SERVER_DEBUG__*/
if (__WEBPACK_DEV_SERVER_DEBUG__) {
  require('../webpack-dev-server-fetch');
}

import React from 'react';
import { List, ListItem } from 'material-ui';
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
      // tooltray: undefined,
    };
  },

  propTypes: {
    height:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    type: React.PropTypes.string.isRequired, // 'CAT' || 'EUI'
    width:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      height: '100%',
      width: '100%',
    };
  },

  componentDidMount() {
    if (this.state.tooltray == null) {
      this.fetchTooltray();
    }
  },

  fetchTooltray() {
    fetch(`http://localhost:3001/CAT/inventory`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (this.isMounted()) { // By the time our promise comes true the component may no longer be mounted, be sure it is first!
        this.setState({
          // fetchJson: json,
          tooltray: json.tooltray,
          loaded: true,
        });
      }
    })
    .catch(e => { console.error(e); });
  },

  handleReset(/* e */) {
  },

  handleSave(/* e */) {
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
        <TooltrayList container={ false } items={ this.state.tooltray }/>
        <MenuDivider/>
        <List subheader="Controls">
          <ListItem leftIcon={ <ActionRestore/> } onClick={ this.handleReset } primaryText="Reset"/>
          <ExerciseNameField/>
          <ListItem leftIcon={ <ActionBackup/> } onClick={ this.handleSave } primaryText="Save"/>
        </List>
      </div>
    );
  },
});

export default Controls;
