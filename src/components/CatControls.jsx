/*global __WEBPACK_DEV_SERVER_DEBUG__*/
if (__WEBPACK_DEV_SERVER_DEBUG__) {
  require('../webpack-dev-server-fetch');
}

import React from 'react';
import { List, ListItem, Styles } from 'material-ui';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import TooltrayList from './TooltrayList';
import ExerciseNameField from './ExerciseNameField';
import 'whatwg-fetch';

const { Colors } = Styles;

let CatControls = React.createClass({

  mixins: [ ],

  getInitialState() {
    return {
      errorTextExerciseName: '',
      // tooltray: undefined,
      // type: 'CAT',
    };
  },

  propTypes: {
    height:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    type: React.PropTypes.string.isRequired,
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
    .catch((e) => { console.error(e); });
  },

  handleExerciseNameChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      errorTextExerciseName: !isNumeric ? '' : 'This field must be a string',
    });
  },

  handleReset(/* e */) {
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

      textfield: {
      },

      icons: {
        height: 24,
        width: 24,
        display: 'inline-block',
        position: 'relative',
        top: 0, // 12 || 4 || 0,
        padding: 12,
        color: Colors.grey600,
        fill: Colors.grey600,
        left: 4,
      },
    };

    return (
      <div ref="container" style={ styles.container }>
        <TooltrayList container={ false } items={ this.state.tooltray }/>
        <List subheader="Controls">
          <ListItem leftIcon={ <ActionRestore/> } onClick={ this.handleReset } primaryText="Reset"/>
          <div>
            <div style={ styles.icons }>
              <ContentSend/>
            </div>
            <ExerciseNameField/>
          </div>
        </List>
      </div>
    );
  },
});

export default CatControls;
