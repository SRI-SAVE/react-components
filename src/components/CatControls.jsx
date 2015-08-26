/*global __WEBPACK_DEV_SERVER_DEBUG__*/
if (__WEBPACK_DEV_SERVER_DEBUG__) {
  require('../webpack-dev-server-fetch');
}

import React from 'react';
import mui from 'material-ui';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import TooltrayList from './TooltrayList';
import BottomTear from './BottomTear';

const { List, ListItem, Styles, TextField } = mui;
const { Colors } = Styles;

let CatControls = React.createClass({

  mixins: [ ],

  getInitialState() {
    return {
      errorTextExerciseName: '',
      tooltray: undefined,
    };
  },

  propTypes: {
    height:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    width:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      height: 350,
      width: 360,
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
          fetchJson: json,
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
      wrapperDiv: {
      },

      container: {
        backgroundColor: '#fff',
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
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
      <div style={ styles.wrapperDiv }>
        <div style={ styles.container }>
          <TooltrayList container={ false } items={[ 'Shooting Range', 'M4 Carbine' ]}/>
          <List subheader="Controls">
            <ListItem leftIcon={ <ActionRestore/> } onClick={ this.handleReset } primaryText="Reset"/>
            <div>
              <div style={ styles.icons }>
                <ContentSend/>
              </div>
              <TextField
                defaultValue=""
                errorStyle={{ color: Colors.red600 }}
                errorText={ this.state.errorTextExerciseName }
                floatingLabelText="Exercise Path and Name"
                hintText="Ex. /PutExercise"
                onChange={ this.handleExerciseNameChange }
                style={ styles.textfield }/>
            </div>
          </List>
        </div>
        <BottomTear width={ this.props.width }/>
      </div>
    );
  },
});

export default CatControls;
